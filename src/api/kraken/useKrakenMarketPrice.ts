import {useQuery} from "react-query";
import {API_BASE_URL, QUERY} from "../constants";

const fetchMarketPrice = async (ticker: string) => {
    const response: any = await fetch(`${API_BASE_URL.KRAKEN}/Ticker?pair=${ticker}`);
    if (!response.ok) {
        console.log(response.message);
    }
    return response.json();
}

export const useKrakenMarketPrice = (ticker: string) => {
    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery<string, Error>([QUERY.KRAKEN_GET_TICKER], () => fetchMarketPrice(ticker), {
        /*      refetchInterval: 5000*/
        retry: false
    });

    return {isLoading, isError, error, data};
}