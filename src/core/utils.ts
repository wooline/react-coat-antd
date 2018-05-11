function obj2String(obj, arr = [], idx = 0) {
  for (let item in obj) {
    arr[idx++] = [item, obj[item]];
  }
  return new URLSearchParams(arr).toString();
}

export function request(method: string, path: string, args: {}) {
  let url = path.replace(/:\w+/g, flag => {
    const key = flag.substr(1);
    return args[key] || "";
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
  } else if (method === "get") {
    const searchStr = obj2String(args);
    url += "?" + searchStr;
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
