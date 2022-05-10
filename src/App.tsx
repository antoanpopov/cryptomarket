import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useBinanceMarketPrice} from "./api/binance/useBinanceMarketPrice";


function App() {

    const binanceResponse = useBinanceMarketPrice('BTCUSDT1');


    return (
        <div className="App">
            <div> {!binanceResponse.isLoading && <span>{JSON.stringify(binanceResponse.data)}</span>}</div>
        </div>
    );
}

export default App;
