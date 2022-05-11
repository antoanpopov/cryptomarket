import React, {useContext, useEffect, useState} from 'react';
import {useBinanceMarketPrice} from "../../api/binance/useBinanceMarketPrice";
import {useHuobiMarketPrice} from "../../api/huobi/useHuobiMarketPrice";
import {useKrakenMarketPrice} from "../../api/kraken/useKrakenMarketPrice";
import {useBitfinexMarketPrice} from "../../api/bitfinex/useBitfinexMarketPrice";
import {Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {AppContext} from "../../store/context";
import Typography from "@mui/material/Typography";
import {OrderHistoryModal} from "../order-history-modal/order-history.modal";
import {getActiveTicker} from "../../helpers/get-active-ticker";

export const LatestPrice = () => {

    const {state: {baseAsset, quoteAsset, assetPair}} = useContext(AppContext);
    const [ticker, setTicker] = useState('');
    const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

    const binanceResponse = useBinanceMarketPrice(ticker);
    const huobiResponse = useHuobiMarketPrice(ticker);
    const krakenResponse = useKrakenMarketPrice(ticker);
    const bitfinexResponse = useBitfinexMarketPrice(ticker);

    useEffect(() => {

        setTicker(getActiveTicker({
            baseAsset,
            quoteAsset,
            assetPair
        }));
        console.log(ticker);
    }, [baseAsset, quoteAsset, assetPair]);

    const renderPrice = (price?: string | number) => {
        return price ?? 'Ticker not supported by exchange.';
    }

    const toggleHistoryModal = () => {
        setIsHistoryModalOpen(!isHistoryModalOpen);
    }

    const onClickMarketRow = (market: string) => {
        setIsHistoryModalOpen(true);
        setSelectedMarket(market);
    }

    return (
        <>
            <Typography variant="h5">{ticker}</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Market</TableCell>
                            <TableCell align="right">Latest Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            key="binance"
                            sx={{'&:last-child td, &:last-child th': {border: 0}, cursor: 'pointer'}}
                            onClick={() => onClickMarketRow('binance')}
                        >
                            <TableCell component="th" scope="row">
                                Binance
                            </TableCell>
                            <TableCell align="right">
                                {binanceResponse.isLoading ?
                                    <Skeleton animation="wave"/> : renderPrice(binanceResponse?.price)}
                            </TableCell>
                        </TableRow>
                        <TableRow key="bitfinex"
                                  sx={{'&:last-child td, &:last-child th': {border: 0}, cursor: 'pointer'}}
                                  onClick={() => onClickMarketRow('bitfinex')}
                        >
                            <TableCell component="th" scope="row">
                                Bitfinex
                            </TableCell>
                            <TableCell align="right">
                                {bitfinexResponse.isLoading ?
                                    <Skeleton animation="wave"/> : renderPrice(bitfinexResponse?.price)}
                            </TableCell>
                        </TableRow>
                        <TableRow key="huobi" sx={{'&:last-child td, &:last-child th': {border: 0}, cursor: 'pointer'}}
                                  onClick={() => onClickMarketRow('huobi')}>
                            <TableCell component="th" scope="row">
                                Huobi
                            </TableCell>
                            <TableCell align="right">
                                {huobiResponse.isLoading ?
                                    <Skeleton animation="wave"/> : renderPrice(huobiResponse?.price)}
                            </TableCell>
                        </TableRow>
                        <TableRow key="kraken"
                                  sx={{'&:last-child td, &:last-child th': {border: 0}, cursor: 'pointer'}}
                                  onClick={() => onClickMarketRow('kraken')}>
                            <TableCell component="th" scope="row">
                                Kraken
                            </TableCell>
                            <TableCell align="right">
                                {krakenResponse.isLoading ?
                                    <Skeleton animation="wave"/> : renderPrice(krakenResponse?.price)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <OrderHistoryModal isOpen={isHistoryModalOpen}
                               handleClose={toggleHistoryModal}
                               market={selectedMarket!}/>
        </>
    )
}