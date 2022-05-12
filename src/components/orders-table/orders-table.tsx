import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {roundAmount} from "../../helpers/round-amount";

interface OrdersTableProps {
    items?: {
        amount: string,
        isBuy: boolean
    }[]
}

export const OrdersTable = ({items}: OrdersTableProps) => {
    return (<>
        {items ? <TableContainer component={Paper} sx={{maxHeight: '90%', paddingBottom: '20px'}}>
            <Table sx={{width: '100%'}} size="small" stickyHeader aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((order, id) => (
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
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : <Typography textAlign="center">Could not retrieve orders history.</Typography>
        }
    </>)
}