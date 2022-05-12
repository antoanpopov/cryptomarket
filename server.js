const express = require("express");
var cors = require('cors')
const https = require('https');
const PORT = process.env.PORT || 3001;
const app = express();
const axios = require('axios');

app.use(cors({
    origin: '*'
}));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get("/binance/*", async (req, res) => {
    try {
        const {data} = await axios.get(`https://api.binance.com/api/v3${req.url.replace('/binance', '')}`);
        return res.send(data);
    } catch (e) {
        return res.send({error: "Invalid Symbol"})
    }
});

app.get("/bitfinex/*", async (req, res) => {
    try {
        const {data} = await axios.get(`https://api-pub.bitfinex.com/v2/${req.url.replace('/bitfinex', '')}`);
        return res.send(data);
    } catch (e) {
        return res.send({error: "Invalid Symbol"})
    }
});

app.get("/huobi/market*", async (req, res) => {
    try {
        const {data} = await axios.get(`https://api.huobi.pro${req.url.replace('/huobi', '')}`);
        return res.send(data);
    } catch (e) {
        console.log(e);
        return res.send({error: "Invalid Symbol"})
    }
});

app.get("/kraken/*", async (req, res) => {
    try {
        const {data} = await axios.get(`https://api.kraken.com/0/public${req.url.replace('/kraken', '')}`);
        return res.send(data);
    } catch (e) {
        console.log(e);
        return res.send({error: "Invalid Symbol"})
    }
});