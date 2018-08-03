export function topath(pattern: string, params: { [name: string]: string }): string {
  let path = pattern;
  Object.entries(params).forEach(([name, value]) => {
    const encodedValue = encodeURIComponent(value);
    path = path.replace(":" + name, encodedValue);
  });
  return path;
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
