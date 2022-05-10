import {useQuery} from "react-query";
import {API_BASE_URL, QUERY} from "../constants";

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
    } = useQuery<string, Error>([QUERY.HUOBI_GET_TICKER], () => fetchMarketPrice(ticker), {
        /*      refetchInterval: 5000*/
        retry: false
    });

    return {isLoading, isError, error, data};
}