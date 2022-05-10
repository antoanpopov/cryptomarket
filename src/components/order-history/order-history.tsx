import React from 'react';
import {useBinanceOrderHistory} from "../../api/binance/useBinanceOrderHistory";

export const OrderHistory = () => {

    const binanceResponse = useBinanceOrderHistory('BTCUSDT');

    return (
        <>
          {/*  <div> {!binanceResponse.isLoading && <span>{JSON.stringify(binanceResponse.data)}</span>}</div>*/}
        </>
    )
}