import {useQuery} from "react-query";
import {API_BASE_URL, QUERY} from "../constants";

interface KrakenOrderHistoryResponse {
    error: string[],
    result: {
        [key: string]: {
            asks: Array<number[]>,
            bids: Array<number[]>,
            [key: string]: Array<number[]>
        }
    }
}

const fetchMarketHistory = async (ticker: string) => {
    const response = await fetch(`${API_BASE_URL.KRAKEN}/Depth?pair=${ticker}`);
    return response.json();
}

export const useKrakenOrderHistory = (ticker: string, market: string | null) => {
    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery<KrakenOrderHistoryResponse, Error>([QUERY.KRAKEN_GET_HISTORY, ticker], () => fetchMarketHistory(ticker), {
        refetchInterval: 5000,
        retry: false,
        enabled: !!ticker && market === 'kraken'
    });

    const trades = data?.result && Object.values(data.result)[0];
    let history;
    if (trades) {
        history = [];
        Object.keys(trades).forEach(key => {
            history.push(...trades[key].map((item) => ({amount: item[1].toString(), isBuy: key === 'bids'})));
        });
    }
    return {isLoading, isError, error, history};
}