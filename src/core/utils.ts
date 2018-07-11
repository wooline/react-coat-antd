import { ColumnProps } from "antd/lib/table";
import { WrappedFormUtils, GetFieldDecoratorOptions } from "antd/lib/form/Form";
import { call, CallEffect } from "redux-saga/effects";

export function topath(pattern: string, params: { [name: string]: string }): string {
  let path = pattern;
  Object.entries(params).forEach(([name, value]) => {
    const encodedValue = encodeURIComponent(value);
    path = path.replace(":" + name, encodedValue);
  });
  return path;
}

export function request(method: string, path: string, args: { [key: string]: any }) {
  let url = path.replace(/:\w+/g, flag => {
    const key = flag.substr(1);
    if (args[key]) {
      const val: string = args[key];
      delete args[key];
      return encodeURIComponent(val);
    } else {
      return "";
    }
  });
  method = method ? method.toLocaleLowerCase() : "get";
  let data = {};
  if (method === "post" || method === "put") {
    data = {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    };
  } else if (method === "get" || method === "delete") {
    const paramsArray: string[] = [];
    Object.keys(args).forEach(key => paramsArray.push(key + "=" + encodeURIComponent(args[key])));
    if (url.search(/\?/) === -1) {
      url += "?" + paramsArray.join("&");
    } else {
      url += "&" + paramsArray.join("&");
    }
  }
  return fetch(url, {
    method,
    credentials: "include",
    ...data,
  }).then(
    res => {
      const contentType = res.headers.get("content-type");
      let content: Promise<any>;
      if (contentType === "application/json; charset=utf-8") {
        content = res.json();
      } else {
        content = res.text();
      }
      switch (res.status) {
        case 200:
        case 201:
        case 304:
          return content;
        case 500:
          throw new Error("无法连接到服务器！");
        case 400:
          return content.then(error => {
            throw error;
          });
        default:
          throw new Error("服务器错误！");
      }
    },
    reject => {
      throw new Error("网络连接错误！");
    },
  );
}

export function buildServiceClient<Service>(serviceModule: { default: {} }): Service {
  const actions = serviceModule.default;
  const ins = Object.keys(actions).reduce((pre, cur) => {
    const metadata = actions[cur].metadata;
    pre[cur] = data => request(metadata.method, metadata.path, data);
    return pre;
  }, {});
  return ins as Service;
}

export function setStorage(moduleName: string, key: string, data: any) {
  localStorage.setItem(`${moduleName}-${key}`, JSON.stringify(data));
}

export function getStorage<T>(moduleName: string, key: string): T {
  return JSON.parse(localStorage.getItem(`${moduleName}-${key}`));
}

export function arrayToMap<T>(arr: T[], key: string = "id"): { [key: string]: T } {
  return arr.reduce((pre, cur) => {
    pre[cur[key]] = cur;
    return pre;
  }, {});
}
export function tableColumns<T>(clos: Array<ColumnProps<T> & { dataIndex: keyof T }>) {
  return clos;
}
export function enumValues<T extends string>(maps: { [key in T]: string }, values: T[]) {
  const options: Array<{ value: string; text: string }> = values.map(val => ({ text: maps[val], value: val }));
  return {
    maps,
    options,
  };
}
export function filterEmpty<T>(data: T): T {
  return Object.keys(data).reduce((previous, current) => {
    if (data[current] !== "" && data[current] !== undefined && data[current] !== null) {
      previous[current] = data[current];
    }
    return previous;
  }, {}) as T;
}
export const FilterRows = {
  gutter: {
    sm: 24,
    xxl: 35,
  },
};
export const FilterCols = {
  xxl: 6,
  xl: 8,
  md: 12,
  sm: 24,
  style: {
    marginBottom: 16,
  },
};
export interface CallProxy<T> extends CallEffect {
  getResponse: () => T;
}

interface CallPromise {
  <T>(fn: () => Promise<T>): CallProxy<T>;
  <T, R1, A1 extends R1>(fn: (req1: R1) => Promise<T>, arg1: A1): CallProxy<T>;
  <T, R1, R2, A1 extends R1, A2 extends R2>(fn: (req1: R1, req2: R2) => Promise<T>, arg1: A1, arg2: A2): CallProxy<T>;
  <T, R1, R2, R3, A1 extends R1, A2 extends R2, A3 extends R3>(fn: (req1: R1, req2: R2, req3: R3) => Promise<T>, arg1: A1, arg2: A2, arg3: A3): CallProxy<T>;
}

export const callPromise: CallPromise = (fn: (...args) => any, ...rest) => {
  let response: any;
  const proxy = (...args) => {
    return fn(...args).then(
      res => {
        response = res;
        return response;
      },
      rej => {
        response = rej;
        throw rej;
      },
    );
  };
  const callEffect = (call as any)(proxy, ...rest);
  (callEffect as any).getResponse = () => {
    return response;
  };
  return callEffect;
};
export function getFormDecorators<D>(form: WrappedFormUtils, fields: { [key in keyof D]: GetFieldDecoratorOptions }) {
  type Keys = keyof typeof fields;
  const decorators = {};
  Object.keys(fields).forEach(key => {
    decorators[key] = form.getFieldDecorator(key, fields[key]);
  });
  return decorators as { [K in Keys]: (node: React.ReactNode) => React.ReactNode };
}
// export function getFormDecorator(form: WrappedFormUtils, fields: { [key: string]: GetFieldDecoratorOptions }) {
//   type result = {[K in keyof F]: Proxy<T[P]>}
//   const decorators = {};
//   Object.keys(fields).forEach(key => {
//     decorators[key] = form.getFieldDecorator(key, fields[key]);
//   });
//   return decorators;
// }
