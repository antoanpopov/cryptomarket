import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {pairs, data} from "../../api/data";
import {Stack} from "@mui/material";
import {useContext, useEffect} from "react";
import {AppContext} from "../../store/context";
import {QuoteActionTypes} from "../../store/actions";

export const SearchBar = () => {
    const {state, dispatch} = useContext(AppContext);

    const onBaseAssetChange = (event: any, value: any) => {
        dispatch({type: QuoteActionTypes.SET_BASE_ASSET, payload: value});
    }

    const onQuoteAssetChange = (event: any, value: any) => {
        dispatch({type: QuoteActionTypes.SET_QUOTE_ASSET, payload: value});
    }

    const onAssetPairChange = (event: any, value: any) => {
        dispatch({type: QuoteActionTypes.SET_ASSET_PAIR, payload: value});
    }

    useEffect(() => {
        console.log(state);
    }, [state]);

    return <Stack direction="row" spacing={2}>
        <Autocomplete
            disablePortal
            id="base-asset"
            options={data}
            sx={{width: 300}}
            value={state.baseAsset}
            onChange={onBaseAssetChange}
            renderInput={(params) => <TextField {...params} label="Base Asset"/>}
        />
        <Autocomplete
            disablePortal
            id="quote-asset"
            options={data}
            sx={{width: 300}}
            value={state.quoteAsset}
            onChange={onQuoteAssetChange}
            renderInput={(params) => <TextField {...params} label="Quote Asset"/>}
        />
        <Autocomplete
            disablePortal
            id="asset-pair"
            options={pairs}
            sx={{width: 300}}
            value={state.assetPair}
            onChange={onAssetPairChange}
            renderInput={(params) => <TextField {...params} label="Asset Pair"/>}
        />
    </Stack>;
}