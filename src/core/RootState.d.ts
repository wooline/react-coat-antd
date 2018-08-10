import {State as AdminState} from "modules/admin";
import {State as AppState} from "modules/app";
import {State as NoticeState} from "modules/notice";
import {State as AgentState} from "modules/agent";
// import { State as GlobalSettingsState } from "modules/globalSettings";
// import { State as SupervisorsState } from "modules/supervisors";
import {RootState} from "react-coat-pkg";

// type State = RootState<AppState & AdminState & DashboardState & GlobalSettingsState & SupervisorsState>;
type State = RootState<AppState & AdminState & NoticeState & AgentState>;
export default State;
