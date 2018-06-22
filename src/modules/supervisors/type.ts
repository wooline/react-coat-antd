import { supervisor } from "core/entity/user.type";
import { BaseModuleState } from "react-coat-pkg";
export type ResourceState = supervisor.Resource["ResourceState"];
export type ResourceActions = supervisor.Resource["ResourceActions"];
export type ResourceApi = supervisor.Resource["ResourceApi"];
export type ItemDetail = supervisor.Resource["ItemDetail"];
export type ItemUpdate = supervisor.Resource["ItemUpdate"];
export type ItemCreate = supervisor.Resource["ItemCreate"];
export type ItemCreateResult = supervisor.Resource["ItemCreateResult"];
export type ItemUpdateResult = supervisor.Resource["ItemUpdateResult"];
export type TableList = supervisor.Resource["TableList"];
export type ListItem = supervisor.Resource["ListItem"];
export type ListFilter = supervisor.Resource["ListFilter"];
export type ListOptional = supervisor.Resource["ListOptional"];
export type ListSummary = supervisor.Resource["ListSummary"];
export interface State extends BaseModuleState, ResourceState {}
