import { buildServiceClient } from "core/utils";

import * as session from "./interface/session";

export default buildServiceClient<session.Service>(session);
