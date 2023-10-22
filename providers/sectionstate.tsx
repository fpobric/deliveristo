import config from "@/config";
import AppState from "@/interfaces/AppState";
import AppActions from "@/types/AppActions";
import { createContext, useEffect, useReducer } from "react";

export const SectionContext = createContext({
  state: {
    selectedSection: "",
  },
  onSectionChange: (sectionName: string) => {},
});

const SelectedSectionProvider = ({ children }: { children: any }) => {
  const appReducer = (state: AppState, action: AppActions) => {
    switch (action.type) {
      case config.reducerActions.selectedSection:
        return { ...state, selectedSection: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(appReducer, {
    selectedSection: "Breed section",
  });
  const onSectionChange = async (sectionName: string) => {
    dispatch({
      type: config.reducerActions.selectedSection,
      payload: sectionName,
    });
  };

  const sectionState = {
    state,
    onSectionChange,
  };

  return (
    <SectionContext.Provider value={sectionState}>
      {children}
    </SectionContext.Provider>
  );
};

export default SelectedSectionProvider;
