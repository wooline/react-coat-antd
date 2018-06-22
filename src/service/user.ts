import { buildServiceClient } from "core/utils";

import * as user from "./interface/user";

export default buildServiceClient<user.Service>(user);
