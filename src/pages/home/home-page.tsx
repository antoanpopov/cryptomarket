import {LatestPrice} from "../../components/latest-price/latest-price";
import React from "react";
import {SearchBar} from "../../components/search-bar/search-bar";

export const HomePage = () => {
    return (
        <>
            <SearchBar/>
            <LatestPrice/>
        </>
    )
}