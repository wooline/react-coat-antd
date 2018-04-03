import { buildServiceClient } from "core/utils";

import * as session from "./interface/global";

export default buildServiceClient<session.Service>(session);
