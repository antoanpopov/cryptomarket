import {LatestPrice} from "../../components/latest-price/latest-price";
import React, {useContext, useEffect} from "react";
import {OrdersTable} from "../../components/orders-table/orders-table";
import {useParams} from "react-router-dom";
import {AppContext} from "../../store/context";
import {pairs} from "../../api/data";
import {QuoteActionTypes} from "../../store/actions";

export const AssetPairPage = () => {
    const {pair} = useParams();
    const {dispatch} = useContext(AppContext);

    useEffect(() => {
        if (pair && pairs.some(asset => asset === pair)) {
            dispatch({type: QuoteActionTypes.SET_ASSET_PAIR, payload: pair.toUpperCase()})
        }
    }, []);

    return <LatestPrice/>
}