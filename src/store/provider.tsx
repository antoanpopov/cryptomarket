import {FunctionComponent, ReactNode, useReducer} from "react";
import {reducer} from "./reducer";
import {AppContext, initialState} from "./context";

export const AppProvider: FunctionComponent<{ children?: ReactNode }> = ({children}: { children?: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>);
}