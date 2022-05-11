import {useQuery} from "react-query";
import {API_BASE_URL, QUERY} from "../constants";

interface HuobiOrderHistoryResponse {
    ch: string,
    status: string,
    ts: number,
    data: {
        id: number,
        ts: number,
        data: {
            id: number,
            amount: number,
            direction: string
        }[]
    }[]
}

const fetchMarketHistory = async (ticker: string) => {
    const response: any = await fetch(`${API_BASE_URL.HUOBI}/market/history/trade?symbol=${ticker.toLowerCase()}&size=100`);
    return response.json();
}

export const useHuobiOrderHistory = (ticker: string, market: string | null) => {
    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery<HuobiOrderHistoryResponse, Error>([QUERY.HUOBI_GET_HISTORY, ticker], () => fetchMarketHistory(ticker), {
        /*      refetchInterval: 5000*/
        retry: false,
        enabled: !!ticker && market === 'huobi'
    });

    const history = data?.data?.map(order => ({
        amount: order.data[0].amount.toString(),
        isBuy: order.data[0].direction === 'buy'
    }));

    return {isLoading, isError, error, history};
}