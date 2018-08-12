export function ajax<T>(method: string, path: string, args: {[key: string]: any} = {}, headers: {[key: string]: string} = {}): Promise<T> {
  method = method.toLocaleLowerCase();
  args = Object.keys(args).reduce((pre, cur) => {
    if (args[cur] !== undefined && args[cur] !== null) {
      pre[cur] = args[cur];
    }
    return pre;
  }, {});
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
  const data = {headers, body: null};
  if (method === "post" || method === "put" || method === "delete") {
    data.headers["Content-Type"] = "application/json; charset=utf-8";
    data.body = JSON.stringify(args);
  } else if (method === "get") {
    const paramsArray: string[] = [];
    Object.keys(args).forEach(key => paramsArray.push(key + "=" + encodeURIComponent(args[key])));
    if (paramsArray.length) {
      if (url.indexOf("?") > -1) {
        url += "&" + paramsArray.join("&");
      } else {
        url += "?" + paramsArray.join("&");
      }
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
      const status = res.status;
      switch (status) {
        case 200:
        case 201:
        case 204:
        case 304:
          return content;
        default:
          return content.then(obj => {
            const message = typeof obj === "string" ? obj.substr(0, 50) : obj.message || status + " 异常！";
            throw new Error(message);
          });
      }
    },
    reject => {
      throw new Error("网络连接错误！");
    },
  );
}
