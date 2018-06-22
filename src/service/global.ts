import { buildServiceClient } from "core/utils";

import * as global from "./interface/global";

export default buildServiceClient<global.Service>(global);
