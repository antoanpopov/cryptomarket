import {InitialState} from "./context";
import {QuoteActions, QuoteActionTypes} from "./actions";

export const reducer = (state: InitialState, action: QuoteActions) => {
    switch (action.type) {
        case QuoteActionTypes.SET_BASE_ASSET:
            return {
                ...state,
                assetPair: '',
                baseAsset: action.payload
            };
        case QuoteActionTypes.SET_QUOTE_ASSET:
            return {
                ...state,
                assetPair: '',
                quoteAsset: action.payload
            };
        case QuoteActionTypes.SET_ASSET_PAIR:
            return {
                ...state,
                baseAsset: '',
                quoteAsset: '',
                assetPair: action.payload
            }
        default:
            return state;
    }
}