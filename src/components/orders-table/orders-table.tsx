import React, {useEffect, useState} from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography
} from "@mui/material";
import {roundAmount} from "../../helpers/round-amount";

interface OrdersTableProps {
    items?: {
        amount: string,
        isBuy: boolean
    }[]
}

export const OrdersTable = ({items}: OrdersTableProps) => {

    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [sortedItems, setSortedItems] = useState(items);

    useEffect(() => {
        if (items) {
            const customSortedItems = Object.values(items).sort((a, b) => {
                return order === 'asc' ? (roundAmount(a.amount) - roundAmount(b.amount)) : (roundAmount(b.amount) - roundAmount(a.amount));
            });
            setSortedItems(customSortedItems);
        }
    }, [items, order]);

    const toggleSortOrder = () => {
        setOrder(order === 'asc' ? 'desc' : 'asc');
    }

    return (<>
        {items ? <TableContainer component={Paper} sx={{maxHeight: '90%', paddingBottom: '20px'}}>
            <Table sx={{width: '100%'}} size="small" stickyHeader aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel active={true} direction={order} onClick={toggleSortOrder}>
                                Amount
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedItems!.map((order, id) => (
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