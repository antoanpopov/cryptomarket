import {useQuery} from "react-query";
import {API_BASE_URL, QUERY} from "../constants";

const fetchMarketHistory = async (ticker: string) => {
    const response: any = await fetch(`${API_BASE_URL.HUOBI}/market/history/trade?symbol=${ticker}`);
    if (!response.ok) {
        console.log(response.message);
    }
    return response.json();
}

export const useHuobiOrderHistory = (ticker: string) => {
    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery<string, Error>([QUERY.HUOBI_GET_HISTORY], () => fetchMarketHistory(ticker), {
        /*      refetchInterval: 5000*/
        retry: false
    });

    return {isLoading, isError, error, data};
}