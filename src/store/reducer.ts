import {InitialState} from "./context";
import {QuoteActions, QuoteActionTypes} from "./actions";
import {getActiveTicker} from "../helpers/get-active-ticker";

export const reducer = (state: InitialState, action: QuoteActions) => {
    switch (action.type) {
        case QuoteActionTypes.SET_BASE_ASSET:
            return {
                ...state,
                assetPair: '',
                baseAsset: action.payload,
                queryTicker: getActiveTicker({
                    quoteAsset: state.quoteAsset,
                    baseAsset: action.payload,
                    assetPair: '',
                })
            };
        case QuoteActionTypes.SET_QUOTE_ASSET:
            return {
                ...state,
                assetPair: '',
                quoteAsset: action.payload,
                queryTicker: getActiveTicker({
                    quoteAsset: action.payload,
                    baseAsset: state.baseAsset,
                    assetPair: '',
                })
            };
        case QuoteActionTypes.SET_ASSET_PAIR:
            return {
                ...state,
                baseAsset: '',
                quoteAsset: '',
                assetPair: action.payload,
                queryTicker: getActiveTicker({
                    quoteAsset: '',
                    baseAsset: '',
                    assetPair: action.payload,
                })
            }
        default:
            return state;
    }
}