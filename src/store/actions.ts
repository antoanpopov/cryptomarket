export enum QuoteActionTypes {
    SET_QUOTE_ASSET = 'SET_QUOTE_ASSET',
    SET_BASE_ASSET = 'SET_BASE_ASSET',
    SET_ASSET_PAIR = 'SET_ASSET_PAIR',
}

type SetQuoteAsset = {
    type: QuoteActionTypes.SET_QUOTE_ASSET,
    payload: string
}

type SetBaseAsset = {
    type: QuoteActionTypes.SET_BASE_ASSET,
    payload: string
}

type SetAssetPair = {
    type: QuoteActionTypes.SET_ASSET_PAIR,
    payload: string
}


export type QuoteActions = SetQuoteAsset | SetBaseAsset | SetAssetPair;