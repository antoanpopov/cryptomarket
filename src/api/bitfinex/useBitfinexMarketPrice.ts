import {useQuery} from "react-query";
import {API_BASE_URL, QUERY} from "../constants";

const fetchMarketPrice = async (ticker: string) => {

    // Unlike other markets, in Bitfinex USDT's key is UST so we need to replace it
    const formattedTicker = ticker.replace('USDT','UST');
    const response: any = await fetch(`${API_BASE_URL.BITFINEX}/ticker/t${formattedTicker}`);
    if (!response.ok) {
        console.log(response.message);
    }
    return response.json();
}

export const useBitfinexMarketPrice = (ticker: string) => {
    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery<string, Error>([QUERY.BITFINEX_GET_TICKER], () => fetchMarketPrice(ticker), {
        /*      refetchInterval: 5000*/
        retry: false
    });

    return {isLoading, isError, error, data};
}