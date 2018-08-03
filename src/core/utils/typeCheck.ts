import { ColumnProps } from "antd/lib/table";
import { GetFieldDecoratorOptions, WrappedFormUtils } from "antd/lib/form/Form";

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
