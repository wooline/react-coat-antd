"use strict";
const path = require("path");
const fs = require("fs");
const zlib = require("zlib");
const jsonFormat = require("json-format");
const crypto = require("crypto");

module.exports = function(maxNum) {
  maxNum = maxNum || 1000;
  const dir = path.resolve("./mock");
  const tempDir = path.join(dir, "temp/");
  const sourceDir = dir;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }
  if (!fs.existsSync(sourceDir)) {
    fs.mkdirSync(sourceDir);
  }
  fs.readdir(tempDir, (err, files) => {
    if (!err) {
      if (files.length > maxNum) {
        const arr = files.map(file => {
          file = path.join(tempDir, file);
          return {file: file, time: fs.statSync(file).atimeMs};
        });
        arr.sort((a, b) => b.time - a.time);
        arr.slice(Math.round(maxNum - maxNum / 3)).forEach(item => {
          fs.unlinkSync(item.file);
        });
      }
    }
  });
  return function(req, res, next) {
    let url = req.url;
    let arr = url.split("?");
    if (arr[1]) {
      url =
        arr[0] +
        "?" +
        arr[1]
          .split("&")
          .sort()
          .join("&");
    }
    const name = (req.method.toLowerCase() + "/" + url)
      .replace(/\//g, "-")
      .replace("?", "$")
      .replace(/[?*:"<>\/|]/g, "-");
    let sourceFileName = path.join(sourceDir, name + ".json");
    let tempFileName = path.join(tempDir, name + ".json");
    if (tempFileName.length > 240) {
      const md5 = crypto.createHash("md5");
      sourceFileName = path.join(sourceDir, md5.update(name).digest("hex") + "--" + name).substr(0, 240) + ".json";
      tempFileName = path.join(tempDir, md5.update(name).digest("hex") + "--" + name).substr(0, 240) + ".json";
    }

    function record() {
      const _write = res.write;
      const _end = res.end;
      let buffer = Buffer.from("");

      res.end = (...args) => {
        const statusCode = res.statusCode;
        const contentType = res.get("content-type") || "";
        if ((statusCode === 200 || statusCode === 201 || statusCode === 204) && args.length == 0 && (!contentType || /\bjson\b|\bhtml\b|\btext\b/.test(contentType))) {
          let body = "";
          if (buffer.length) {
            const encoding = contentType.split("charset=")[1] || "utf8";
            if (res.getHeader("content-encoding") === "gzip") {
              body = zlib.gunzipSync(buffer).toString(encoding);
            } else {
              body = buffer.toString(encoding);
            }
            if (/\bjson\b/.test(contentType)) {
              body = JSON.parse(body);
            }
          }

          const resHeaders = {...res.getHeaders()};
          delete resHeaders["content-length"];
          delete resHeaders["etag"];
          delete resHeaders["date"];
          delete resHeaders["content-encoding"];
          const data = {
            url: req.url,
            statusCode: statusCode,
            statusMessage: res.statusMessage,
            headers: resHeaders,
            response: body,
          };
          fs.writeFile(tempFileName, jsonFormat(data, {type: "space"}), err => {
            if (err) {
              console.log(err);
            }
          });
        } else if (statusCode >= 400) {
          console.log("=>" + sourceFileName);
        }
        return _end.apply(res, args);
      };
      res.write = (...args) => {
        //proxy路由调用write方法，其余调用send方法
        if (Buffer.isBuffer(args[0])) {
          buffer = Buffer.concat([buffer, args[0]]);
        }
        return _write.apply(res, args);
      };
      next();
    }
    if (fs.existsSync(sourceFileName)) {
      fs.readFile(sourceFileName, "utf-8", function(err, content) {
        if (err) {
          console.log(err);
          res.writeHead(500, {"content-type": "text/plain; charset=utf-8"});
          res.end(err.toString());
        } else {
          try {
            const data = JSON.parse(content);
            let str = data.response;
            if (typeof str === "object") {
              data.headers["content-type"] = "application/json; charset=utf-8";
              str = JSON.stringify(str);
            }
            data.headers["content-length"] = str.length.toString();
            if (data.headers["x-delay"]) {
              setTimeout(() => {
                res.set(data.headers);
                res.end(str);
              }, parseInt(data.headers["x-delay"]) || 1000);
            } else {
              res.set(data.headers);
              res.end(str);
            }
          } catch (err) {
            console.log(err);
            res.writeHead(500, {"content-type": "text/plain; charset=utf-8"});
            res.end(err.toString());
          }
        }
      });
    } else {
      record();
    }
  };
};
