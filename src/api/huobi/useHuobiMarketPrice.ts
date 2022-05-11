import {useQuery} from "react-query";
import {API_BASE_URL, QUERY} from "../constants";

interface HuobiMarketPriceResponse {
    ch: string,
    status: string,
    ts: number,
    tick?: {
        id: number,
        low: number,
        high: number,
        open: number,
        close: number,
        amount: number,
        version: number,
        count: number
    }
}

const fetchMarketPrice = async (ticker: string) => {
    const response: any = await fetch(`${API_BASE_URL.HUOBI}/market/detail?symbol=${ticker.toLowerCase()}`);
    if (!response.ok) {
        console.log(response.message);
    }
    return response.json();
}

export const useHuobiMarketPrice = (ticker: string) => {
    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery<HuobiMarketPriceResponse, Error>([QUERY.HUOBI_GET_TICKER, ticker], () => fetchMarketPrice(ticker), {
        /*      refetchInterval: 5000*/
        retry: false,
        enabled: !!ticker
    });

    const price = (data?.tick) ? data.tick.close : undefined;

    return {isLoading, isError, error, price};
}