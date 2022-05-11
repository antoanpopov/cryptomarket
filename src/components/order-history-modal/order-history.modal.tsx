import React, {useContext} from 'react';
import {Box, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import {AppContext} from "../../store/context";
import {useBinanceOrderHistory} from "../../api/binance/useBinanceOrderHistory";

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

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                    Latest orders for "ADD PAIR HERE" on {market?.toUpperCase()}
                </Typography>
                <TableContainer component={Paper} sx={{maxHeight: '90%', paddingBottom: '20px'}}>
                    <Table sx={{width: '100%'}} size="small" stickyHeader aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {binanceHistoryResponse.history?.map((order, id) => (
                                <TableRow
                                    key={`${id}-${order.price}`}
                                    sx={{
                                        '&:last-child td, &:last-child th': {border: 0},
                                        bgcolor: order.isBuy ? '#388e3c' : '#f44336'
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {order.price}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Modal>
    )
}