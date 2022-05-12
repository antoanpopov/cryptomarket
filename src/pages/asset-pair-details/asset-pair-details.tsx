import {useParams} from "react-router-dom";
import React, {useContext, useEffect} from "react";
import {AppContext} from "../../store/context";
import {pairs} from "../../api/data";
import {QuoteActionTypes} from "../../store/actions";
import {LatestPrice} from "../../components/latest-price/latest-price";
import {useBinanceOrderHistory} from "../../api/binance/useBinanceOrderHistory";
import {useBitfinexOrderHistory} from "../../api/bitfinex/useBitfinexOrderHistory";
import {useHuobiOrderHistory} from "../../api/huobi/useHuobiOrderHistory";
import {useKrakenOrderHistory} from "../../api/kraken/useKrakenOrderHistory";
import {SkeletonTable} from "../../components/order-history-modal/skeleton-table";
import {OrdersTable} from "../../components/orders-table/orders-table";
import {Grid, Paper, Typography} from "@mui/material";

export const AssetPairDetailsPage = () => {
    const {pair} = useParams();
    const {state: {queryTicker}, dispatch} = useContext(AppContext);
    const binanceHistoryResponse = useBinanceOrderHistory(queryTicker, 'binance');
    const bitfinexHistoryResponse = useBitfinexOrderHistory(queryTicker, 'bitfinex');
    const huobiHistoryResponse = useHuobiOrderHistory(queryTicker, 'huobi');
    const krakenResponse = useKrakenOrderHistory(queryTicker, 'kraken');

    useEffect(() => {
        if (pair && pairs.some(asset => asset === pair)) {
            dispatch({type: QuoteActionTypes.SET_ASSET_PAIR, payload: pair.toUpperCase()})
        }
    }, [pair, dispatch]);

    return <>
        <LatestPrice/>
        <Paper variant="outlined" sx={{padding: 2, margin: "20px 0 35px 0"}}>
            <Typography variant="h4">Combined Order History</Typography>
        </Paper>
        <Grid container spacing={2}>
            <Grid item md={6} xs={12}
                  sx={{paddingTop: '0 !important', marginBottom: 2, height: 300, overflowY: 'scroll'}}>
                <Paper variant="outlined" sx={{paddingBottom: 2}}>
                    <Typography fontWeight="bold" padding={2}>Binance</Typography>
                    {binanceHistoryResponse.isLoading ? <SkeletonTable/> :
                        <OrdersTable items={binanceHistoryResponse.history}/>}
                </Paper>
            </Grid>
            <Grid item md={6} xs={12}
                  sx={{paddingTop: '0 !important', marginBottom: 2, height: 300, overflowY: 'scroll'}}>
                <Paper variant="outlined" sx={{paddingBottom: 2}}>
                    <Typography fontWeight="bold" padding={2}>Bitfinex</Typography>
                    {bitfinexHistoryResponse.isLoading ? <SkeletonTable/> :
                        <OrdersTable items={bitfinexHistoryResponse.history}/>}
                </Paper>
            </Grid>
            <Grid item md={6} xs={12}
                  sx={{paddingTop: '0 !important', marginBottom: 2, height: 300, overflowY: 'scroll'}}>
                <Paper variant="outlined" sx={{paddingBottom: 2}}>
                    <Typography fontWeight="bold" padding={2}>Huobi</Typography>
                    {huobiHistoryResponse.isLoading ? <SkeletonTable/> :
                        <OrdersTable items={huobiHistoryResponse.history}/>}
                </Paper>
            </Grid>
            <Grid item md={6} xs={12}
                  sx={{paddingTop: '0 !important', marginBottom: 2, height: 300, overflowY: 'scroll'}}>
                <Paper variant="outlined" sx={{paddingBottom: 2}}>
                    <Typography fontWeight="bold" padding={2}>Kraken</Typography>
                    {krakenResponse.isLoading ? <SkeletonTable/> :
                        <OrdersTable items={krakenResponse.history}/>}
                </Paper>
            </Grid>
        </Grid>
    </>
}
