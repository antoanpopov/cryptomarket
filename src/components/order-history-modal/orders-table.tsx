import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {roundAmount} from "../../helpers/round-amount";

interface OrdersTableProps {
    items?: {
        amount: string,
        isBuy: boolean
    }[]
}

export const OrdersTable = ({items}: OrdersTableProps) => {
    return <TableContainer component={Paper} sx={{maxHeight: '90%', paddingBottom: '20px'}}>
        <Table sx={{width: '100%'}} size="small" stickyHeader aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell>Amount</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {items ? items.map((order, id) => (
                    <TableRow
                        key={`${id}-${order.amount}`}
                        sx={{
                            '&:last-child td, &:last-child th': {border: 0},
                            bgcolor: order.isBuy ? '#388e3c' : '#f44336'
                        }}
                    >
                        <TableCell scope="row">
                            {roundAmount(order.amount)}
                        </TableCell>
                    </TableRow>
                )) : <TableRow>
                    <TableCell>could not retrieve orders history.</TableCell>
                </TableRow>}
            </TableBody>
        </Table>
    </TableContainer>
}