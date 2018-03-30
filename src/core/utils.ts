export function request(method: string, path: string, args: {}) {
  const url = path.replace(/:\w+/g, flag => {
    const key = flag.substr(1);
    return args[key] || "";
  });
  return fetch(url, {
    method,
  }).then(res => {
    return res.json();
  });
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
