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
