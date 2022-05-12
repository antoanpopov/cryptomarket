import {useQuery} from "react-query";
import {API_BASE_URL, QUERY} from "../constants";

interface BinanceMarketPriceResponse {
    price?: string;
}

const fetchMarketPrice = async (ticker: string) => {
    const response = await fetch(`${API_BASE_URL.BINANCE}/ticker/price?symbol=${ticker}`);
    return response.json();
}

export const useBinanceMarketPrice = (ticker: string) => {
    const {
        isLoading,
        isError,
        error,
        data,
    } = useQuery<BinanceMarketPriceResponse, Error>([QUERY.BINANCE_GET_TICKER, ticker], () => fetchMarketPrice(ticker), {
        /*      refetchInterval: 5000*/
        retry: false,
        enabled: !!ticker
    });

    const price = data ? data?.price : undefined;

    return {isLoading, isError, error, price};
}