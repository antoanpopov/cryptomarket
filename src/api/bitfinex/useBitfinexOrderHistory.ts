import {useQuery} from "react-query";
import {API_BASE_URL, QUERY} from "../constants";

const fetchMarketHistory = async (ticker: string) => {

    // Unlike other markets, in Bitfinex USDT's key is UST so we need to replace it
    const formattedTicker = ticker.replace('USDT', 'UST');
    const response: any = await fetch(`${API_BASE_URL.BITFINEX}/trades/t${formattedTicker}/hist`);
    return response.json();
}

export const useBitfinexOrderHistory = (ticker: string, market: string | null) => {
    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery<Array<number[]>, Error>([QUERY.BITFINEX_GET_HISTORY, ticker], () => fetchMarketHistory(ticker), {
        /*      refetchInterval: 5000*/
        retry: false,
        enabled: !!ticker && market === 'bitfinex'
    });

    const history = (data && data.length > 0) ? data.map(order => ({
        amount: Math.abs(order[2]).toString(),
        isBuy: order[2] > 0
    })) : undefined;

    return {isLoading, isError, error, history};
}