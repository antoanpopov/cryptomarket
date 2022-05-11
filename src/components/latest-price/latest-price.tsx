import React, {useContext} from 'react';
import {useBinanceMarketPrice} from "../../api/binance/useBinanceMarketPrice";
import {useHuobiMarketPrice} from "../../api/huobi/useHuobiMarketPrice";
import {useKrakenMarketPrice} from "../../api/kraken/useKrakenMarketPrice";
import {useBitfinexMarketPrice} from "../../api/bitfinex/useBitfinexMarketPrice";
import {Skeleton} from "@mui/material";
import {AppContext} from "../../store/context";

export const LatestPrice = () => {

    const {state} = useContext(AppContext);
    console.log(state);
    const binanceResponse = useBinanceMarketPrice(state.assetPair);
    const huobiResponse = useHuobiMarketPrice(state.assetPair);
    const krakenResponse = useKrakenMarketPrice(state.assetPair);
    const bitfinexResponse = useBitfinexMarketPrice(state.assetPair);

    return (
        <>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Skeleton animation="wave"/>
            <div> {!binanceResponse.isLoading && <span>{JSON.stringify(binanceResponse.data)}</span>}</div>
            <div> {!huobiResponse.isLoading && <span>{JSON.stringify(huobiResponse.data)}</span>}</div>
            <div> {!krakenResponse.isLoading && <span>{JSON.stringify(krakenResponse.data)}</span>}</div>
            <div> {!bitfinexResponse.isLoading && <span>{JSON.stringify(bitfinexResponse.data)}</span>}</div>
        </>
    )
}