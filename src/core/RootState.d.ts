import { State as AdminState } from "modules/admin";
import { State as AppState } from "modules/app";
import { State as DashboardState } from "modules/dashboard";
import { State as GlobalSettingsState } from "modules/globalSettings";
import { State as SupervisorsState } from "modules/supervisors";
import { StoreState } from "react-coat-pkg";

type RootState = StoreState<AppState & AdminState & DashboardState & GlobalSettingsState & SupervisorsState>;
export default RootState;
