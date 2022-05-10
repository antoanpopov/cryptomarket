import React from 'react';
import {useBinanceMarketPrice} from "../../api/binance/useBinanceMarketPrice";
import {useHuobiMarketPrice} from "../../api/huobi/useHuobiMarketPrice";
import {useKrakenMarketPrice} from "../../api/kraken/useKrakenMarketPrice";
import {useBitfinexMarketPrice} from "../../api/bitfinex/useBitfinexMarketPrice";
import {Skeleton} from "@mui/material";

export const LatestPrice = () => {

    const ticker = 'BTCUSDT';
    const binanceResponse = useBinanceMarketPrice(ticker);
    const huobiResponse = useHuobiMarketPrice(ticker);
    const krakenResponse = useKrakenMarketPrice(ticker);
    const bitfinexResponse = useBitfinexMarketPrice(ticker);

    return (
        <>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Skeleton animation="wave" />
            <div> {!binanceResponse.isLoading && <span>{JSON.stringify(binanceResponse.data)}</span>}</div>
            <div> {!huobiResponse.isLoading && <span>{JSON.stringify(huobiResponse.data)}</span>}</div>
            <div> {!krakenResponse.isLoading && <span>{JSON.stringify(krakenResponse.data)}</span>}</div>
            <div> {!bitfinexResponse.isLoading && <span>{JSON.stringify(bitfinexResponse.data)}</span>}</div>
        </>
    )
}