import {useQuery} from "react-query";
import {API_BASE_URL, QUERY} from "../constants";

interface BinanceOrderHistoryResponse {
    id: number,
    price: string,
    qty: string,
    quoteQty: string,
    time: number,
    isBuyerMaker: boolean,
    isBestMatch: boolean
}

const fetchMarketHistory = async (ticker: string) => {
    const response: any = await fetch(`${API_BASE_URL.BINANCE}/trades?symbol=${ticker}`);
    return response.json();
}

export const useBinanceOrderHistory = (ticker: string, market: string | null) => {
    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery<BinanceOrderHistoryResponse[], Error>([QUERY.BINANCE_GET_HISTORY], () => fetchMarketHistory(ticker), {
        /*      refetchInterval: 5000*/
        enabled: !!ticker && market === 'binance'
    });

    const history = data?.map(order => ({price: order.price, isBuy: order.isBuyerMaker}));

    return {isLoading, isError, error, history};
}