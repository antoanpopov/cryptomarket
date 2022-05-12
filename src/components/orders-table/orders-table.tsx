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

    const [isSortingActive, setIsSortingActive] = useState(false);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [sortedItems, setSortedItems] = useState(items);

    useEffect(() => {
        if (items && isSortingActive) {
            const customSortedItems = Object.values(items).sort((a, b) => {
                return order === 'asc' ? (roundAmount(a.amount) - roundAmount(b.amount)) : (roundAmount(b.amount) - roundAmount(a.amount));
            });
            setSortedItems(customSortedItems);
        } else {
            setSortedItems(items);
        }
    }, [items, order, isSortingActive]);

    const toggleSortOrder = () => {
        setIsSortingActive(true);
        setOrder(order === 'asc' ? 'desc' : 'asc');
    }

    return (<>
        {items ? <TableContainer component={Paper} sx={{maxHeight: '90%', paddingBottom: '20px'}}>
            <Table sx={{width: '100%'}} size="small" stickyHeader aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel active={isSortingActive} direction={order} onClick={toggleSortOrder}>
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