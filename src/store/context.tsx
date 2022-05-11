import React, {createContext} from "react";

export interface InitialState {
    baseAsset: string;
    quoteAsset: string;
    assetPair: string;
}

export const initialState: InitialState = {
    baseAsset: '',
    quoteAsset: '',
    assetPair: 'BTCUSDT'
}

export const AppContext = createContext<{ state: InitialState, dispatch: React.Dispatch<any> }>({
    state: initialState,
    dispatch: () => null
});