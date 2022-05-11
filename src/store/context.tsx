import React, {createContext} from "react";

export interface InitialState {
    baseAsset: string;
    quoteAsset: string;
    assetPair: string;
    queryTicker: string;
}

export const initialState: InitialState = {
    baseAsset: '',
    quoteAsset: '',
    assetPair: '',
    queryTicker: ''
}

export const AppContext = createContext<{ state: InitialState, dispatch: React.Dispatch<any> }>({
    state: initialState,
    dispatch: () => null
});