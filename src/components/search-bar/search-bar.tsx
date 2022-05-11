import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {data, pairs} from "../../api/data";
import {Box, Stack} from "@mui/material";
import {useContext} from "react";
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

    return <Stack direction="row" spacing={2} paddingTop="20px" alignContent="center" justifyContent="center"
                  alignItems="center">
        <Autocomplete
            disablePortal
            id="base-asset"
            options={data}
            sx={{width: 300}}
            value={state.baseAsset}
            onChange={onBaseAssetChange}
            renderInput={(params) => <TextField {...params} label="Base Asset"/>}
        />
        <Box>+</Box>
        <Autocomplete
            disablePortal
            id="quote-asset"
            options={data}
            sx={{width: 300}}
            value={state.quoteAsset}
            onChange={onQuoteAssetChange}
            renderInput={(params) => <TextField {...params} label="Quote Asset"/>}
        />
        <Box>Or</Box>
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