interface getActiveTickerProps {
    baseAsset: string,
    quoteAsset: string,
    assetPair: string
}

export const getActiveTicker = ({baseAsset, quoteAsset, assetPair}: getActiveTickerProps) => {
    const customTicker = (!!baseAsset && !!quoteAsset) ? `${baseAsset}${quoteAsset}` : '';
    return !!assetPair ? assetPair : customTicker;
}