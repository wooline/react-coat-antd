import { buildServiceClient } from "core/utils/request";
import * as global from "./interface/globalService";

export default buildServiceClient<global.Service>(global);
