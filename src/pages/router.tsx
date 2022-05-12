import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {HomePage} from "./home/home-page";
import {AssetPairPage} from "./asset-pair/asset-pair";
import {AssetPairDetailsPage} from "./asset-pair-details/asset-pair-details";

export const Router = () => {
    return <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/:pair" element={<AssetPairPage/>}/>
        <Route path="/:pair/details" element={<AssetPairDetailsPage/>}/>
    </Routes>
}