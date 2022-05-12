import React, {useContext} from 'react';
import {Box, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import {AppContext} from "../../store/context";
import {useBinanceOrderHistory} from "../../api/binance/useBinanceOrderHistory";
import {SkeletonTable} from "./skeleton-table";
import {OrdersTable} from "../orders-table/orders-table";
import {useBitfinexOrderHistory} from "../../api/bitfinex/useBitfinexOrderHistory";
import {useKrakenOrderHistory} from "../../api/kraken/useKrakenOrderHistory";
import {useHuobiOrderHistory} from "../../api/huobi/useHuobiOrderHistory";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface OrderHistoryModalProps {
    isOpen: boolean,
    handleClose: () => void,
    market: string | null
}

export const OrderHistoryModal = ({isOpen, handleClose, market}: OrderHistoryModalProps) => {

    const {state: {queryTicker}} = useContext(AppContext);
    const binanceHistoryResponse = useBinanceOrderHistory(queryTicker, market);
    const bitfinexHistoryResponse = useBitfinexOrderHistory(queryTicker, market);
    const huobiHistoryResponse = useHuobiOrderHistory(queryTicker, market);
    const krakenResponse = useKrakenOrderHistory(queryTicker, market);

    const renderMarketTable = () => {
        switch (market) {
            case 'binance':
                return <>
                    {binanceHistoryResponse.isLoading ? <SkeletonTable/> :
                        <OrdersTable items={binanceHistoryResponse.history}/>}
                </>
            case 'bitfinex':
                return <>
                    {bitfinexHistoryResponse.isLoading ? <SkeletonTable/> :
                        <OrdersTable items={bitfinexHistoryResponse.history}/>}
                </>
            case 'huobi':
                return <>
                    {huobiHistoryResponse.isLoading ? <SkeletonTable/> :
                        <OrdersTable items={huobiHistoryResponse.history}/>}
                </>
            case 'kraken':
                return <>
                    {krakenResponse.isLoading ? <SkeletonTable/> :
                        <OrdersTable items={krakenResponse.history}/>}
                </>
            default:
                return <Box>No Market Selected!</Box>
        }
    }

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                    Latest orders for <span style={{fontWeight: 'bold'}}>{queryTicker}</span> on <span
                    style={{fontWeight: 'bold'}}>{market?.toUpperCase()}</span>
                </Typography>
                {renderMarketTable()}
            </Box>
        </Modal>
    )
}