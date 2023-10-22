import config from "../config";

type AppActions = {
  type: typeof config.reducerActions.selectedSection;
  payload: string;
};
export default AppActions;
