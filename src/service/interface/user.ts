import { user } from "./entity/user.type";

export namespace getSupervisors {
  export type Request = user.supervisor.ListFilter;
  export type Response = user.supervisor.List;
  export const metadata = { method: "GET", path: "/ajax/user/supervisors" };
  export type Action = (request: Request) => Promise<Response>;
}

export interface Service {
  getSupervisors: getSupervisors.Action;
}

export default { getSupervisors };
