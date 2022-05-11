import {useQuery} from "react-query";
import {API_BASE_URL, QUERY} from "../constants";

interface KrakenMarketPriceResponse {
    error: string[],
    result?: {
        [key: string]: {
            a: string[],
            b: string[],
            c: string[],
            v: string[],
            p: string[],
            t: number[],
            1: string[],
            h: string[],
            o: string
        }
    }
}

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
    } = useQuery<KrakenMarketPriceResponse, Error>([QUERY.KRAKEN_GET_TICKER, ticker], () => fetchMarketPrice(ticker), {
        /*      refetchInterval: 5000*/
        retry: false,
        enabled: !!ticker
    });

    // Since Kraken's ticker in the response is quite different from what we pass,
    // we are getting the values of the first key and the first item in c (close)
    // for latest the price.
    const price = data?.result ? Object.values(data.result)[0].c[0] : undefined;

    return {isLoading, isError, error, price};
}