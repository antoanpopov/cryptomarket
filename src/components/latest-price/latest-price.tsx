import React, {useContext, useState} from 'react';
import {useBinanceMarketPrice} from "../../api/binance/useBinanceMarketPrice";
import {useHuobiMarketPrice} from "../../api/huobi/useHuobiMarketPrice";
import {useKrakenMarketPrice} from "../../api/kraken/useKrakenMarketPrice";
import {useBitfinexMarketPrice} from "../../api/bitfinex/useBitfinexMarketPrice";
import {
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {AppContext} from "../../store/context";
import {OrderHistoryModal} from "../order-history-modal/order-history.modal";
import {roundAmount} from "../../helpers/round-amount";

export const LatestPrice = () => {

    const {state: {queryTicker}} = useContext(AppContext);
    const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

    const binanceResponse = useBinanceMarketPrice(queryTicker);
    const huobiResponse = useHuobiMarketPrice(queryTicker);
    const krakenResponse = useKrakenMarketPrice(queryTicker);
    const bitfinexResponse = useBitfinexMarketPrice(queryTicker);

    const renderPrice = (price?: string | number) => {
        return price ? roundAmount(price) : 'Ticker not supported by exchange.';
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
            <Typography variant="h5" align="center" padding="20px 0">{queryTicker ? <>
                Selected Pair <span style={{display: 'inline', fontWeight: 'bold'}}>{queryTicker}</span>
            </> : 'No Asset Pair selected'}</Typography>
            {queryTicker &&
                <>
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
                                <TableRow key="huobi"
                                          sx={{'&:last-child td, &:last-child th': {border: 0}, cursor: 'pointer'}}
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
                </>}
        </>
    )
}