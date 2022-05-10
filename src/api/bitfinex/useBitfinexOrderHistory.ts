import {useQuery} from "react-query";
import {API_BASE_URL, QUERY} from "../constants";

const fetchMarketHistory = async (ticker: string) => {

    // Unlike other markets, in Bitfinex USDT's key is UST so we need to replace it
    const formattedTicker = ticker.replace('USDT','UST');
    const response: any = await fetch(`${API_BASE_URL.KRAKEN}/Depth?pair=${formattedTicker}`);
    if (!response.ok) {
        console.log(response.message);
    }
    return response.json();
}

export const useBitfinexOrderHistory = (ticker: string) => {
    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery<string, Error>([QUERY.KRAKEN_GET_HISTORY], () => fetchMarketHistory(ticker), {
        /*      refetchInterval: 5000*/
        retry: false
    });

    return {isLoading, isError, error, data};
}