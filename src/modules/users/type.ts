import { user } from "core/entity/user.type";
import { BaseModuleState } from "react-coat-pkg";
export type ResourceState = user.Resource["ResourceState"];
export type ResourceActions = user.Resource["ResourceActions"];
export type ResourceApi = user.Resource["ResourceApi"];
export type ItemDetail = user.Resource["ItemDetail"];
export type ItemUpdate = user.Resource["ItemUpdate"];
export type ItemCreate = user.Resource["ItemCreate"];
export type ItemCreateResult = user.Resource["ItemCreateResult"];
export type ItemUpdateResult = user.Resource["ItemUpdateResult"];
export type TableList = user.Resource["TableList"];
export type ListItem = user.Resource["ListItem"];
export type ListFilter = user.Resource["ListFilter"];
export type ListOptional = user.Resource["ListOptional"];
export type ListSummary = user.Resource["ListSummary"];
export interface State extends BaseModuleState, ResourceState {}
