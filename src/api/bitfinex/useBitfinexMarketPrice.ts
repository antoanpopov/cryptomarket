import {useQuery} from "react-query";
import {API_BASE_URL, QUERY} from "../constants";

enum TickerResponseKeys {
    BID,
    BID_SIZE,
    ASK,
    ASK_SIZE,
    DAILY_CHANGE,
    DAILY_CHANGE_RELATIVE,
    LAST_PRICE,
    VOLUME,
    HIGH,
    LOW
}

const fetchMarketPrice = async (ticker: string) => {
    // Unlike other markets, in Bitfinex USDT's key is UST so we need to replace it
    const formattedTicker = ticker.replace('USDT', 'UST');
    const response: any = await fetch(`${API_BASE_URL.BITFINEX}/ticker/t${formattedTicker}`);
    return response.json();
}

export const useBitfinexMarketPrice = (ticker: string) => {
    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery<number[], Error>([QUERY.BITFINEX_GET_TICKER, ticker], () => fetchMarketPrice(ticker), {
        /*      refetchInterval: 5000*/
        retry: false,
        enabled: !!ticker
    });

    const price = data ? data[TickerResponseKeys.LAST_PRICE]?.toString() : undefined;

    return {isLoading, isError, error, price};
}