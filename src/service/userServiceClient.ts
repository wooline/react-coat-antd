import { buildServiceClient } from "core/utils/request";
import * as user from "./interface/userService";

export default buildServiceClient<user.Service>(user);
