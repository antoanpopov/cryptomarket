export enum API_BASE_URL {
    BINANCE = 'https://api.binance.com/api/v3',
    BITFINEX = 'https://api-pub.bitfinex.com/v2',
    HUOBI = 'https://api.huobi.pro',
    KRAKEN = 'https://api.kraken.com/0/public',
}

export enum QUERY {
    BINANCE_GET_TICKER = 'BINANCE_GET_TICKER',
    BINANCE_GET_HISTORY = 'BINANCE_GET_HISTORY',
    BITFINEX_GET_TICKER = 'BITFINEX_GET_TICKER',
    BITFINEX_GET_HISTORY = 'BITFINEX_GET_HISTORY',
    HUOBI_GET_TICKER = 'HUOBI_GET_TICKER',
    HUOBI_GET_HISTORY = 'HUOBI_GET_HISTORY',
    KRAKEN_GET_TICKER = 'KRAKEN_GET_TICKER',
    KRAKEN_GET_HISTORY = 'KRAKEN_GET_HISTORY',
}