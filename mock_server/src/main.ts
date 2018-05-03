import { Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import * as express from "express";
import * as httpProxyMiddleware from "http-proxy-middleware";

import { ApplicationModule } from "./app.module";
import { buildDirPath, packageJsonPath } from "./utils";

const options = require(packageJsonPath);
const hostUrl = options.mockServer.replace(/\/$/, "");

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  if (process.env.NODE_ENV === "production" && options.proxy) {
    app.use(express.static(buildDirPath));
    /**
     * Assume a proxy configuration specified as:
     * proxy: {
     *   'context': { options }
     * }
     * OR
     * proxy: {
     *   'context': 'target'
     * }
     */
    if (!Array.isArray(options.proxy)) {
      options.proxy = Object.keys(options.proxy).map(context => {
        let proxyOptions;
        // For backwards compatibility reasons.
        const correctedContext = context.replace(/^\*$/, "**").replace(/\/\*$/, "");

        if (typeof options.proxy[context] === "string") {
          proxyOptions = {
            context: correctedContext,
            target: options.proxy[context],
          };
        } else {
          proxyOptions = Object.assign({}, options.proxy[context]);
          proxyOptions.context = correctedContext;
        }
        proxyOptions.logLevel = proxyOptions.logLevel || "warn";

        return proxyOptions;
      });
    }

    const getProxyMiddleware = proxyConfig => {
      const context = proxyConfig.context || proxyConfig.path;
      // It is possible to use the `bypass` method without a `target`.
      // However, the proxy middleware has no use in this case, and will fail to instantiate.
      if (proxyConfig.target && typeof proxyConfig.target === "string" && proxyConfig.target.indexOf(hostUrl) !== 0) {
        console.log(context, "proxy to", proxyConfig.target);
        return httpProxyMiddleware(context, proxyConfig);
      }
    };

    /**
     * Assume a proxy configuration specified as:
     * proxy: [
     *   {
     *     context: ...,
     *     ...options...
     *   },
     *   // or:
     *   function() {
     *     return {
     *       context: ...,
     *       ...options...
     *     };
     *   }
     * ]
     */
    options.proxy.forEach(proxyConfigOrCallback => {
      let proxyConfig;
      let proxyMiddleware;

      if (typeof proxyConfigOrCallback === "function") {
        proxyConfig = proxyConfigOrCallback();
      } else {
        proxyConfig = proxyConfigOrCallback;
      }

      proxyMiddleware = getProxyMiddleware(proxyConfig);
      if (proxyConfig.ws) {
        // 不支持websocketProxies
        // websocketProxies.push(proxyMiddleware);
      }

      app.use((req, res, next) => {
        if (typeof proxyConfigOrCallback === "function") {
          const newProxyConfig = proxyConfigOrCallback();
          if (newProxyConfig !== proxyConfig) {
            proxyConfig = newProxyConfig;
            proxyMiddleware = getProxyMiddleware(proxyConfig);
          }
        }
        const bypass = typeof proxyConfig.bypass === "function";
        // eslint-disable-next-line
        const bypassUrl = (bypass && proxyConfig.bypass(req, res, proxyConfig)) || false;

        if (bypassUrl) {
          req.url = bypassUrl;
          next();
        } else if (proxyMiddleware) {
          return proxyMiddleware(req, res, next);
        } else {
          next();
        }
      });
    });
  }
  await app.listen(parseInt(hostUrl.split(":").pop(), 10));

  console.info("=================================================");
  console.info("mock server running: ", hostUrl);
}
bootstrap();
