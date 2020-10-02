import React, { useReducer, createContext, useContext } from "react";
import reducer from "./GlobalStore.reducer";

export const GlobalStoreContext = createContext<any>([]);

const initialState = {
  userInfo: {},
  configs: {}
};

export const GlobalStoreProvider = (props: any) => {
  const [state, dispatch] = useReducer<any>(reducer, initialState);

  return (
    <GlobalStoreContext.Provider value={[state, dispatch]}>
      {props.children}
    </GlobalStoreContext.Provider>
  );
};

export const useGlobalStore = () => useContext(GlobalStoreContext)
