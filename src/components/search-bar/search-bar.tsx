import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {pairs, data} from "../../api/data";
import {Stack} from "@mui/material";

export const SearchBar = () => {

    return <Stack direction="row" spacing={2}>
        <Autocomplete
            disablePortal
            id="base-asset"
            options={data}
            sx={{width: 300}}
            renderInput={(params) => <TextField {...params} label="Base Asset"/>}
        />
        <Autocomplete
            disablePortal
            id="quote-asset"
            options={data}
            sx={{width: 300}}
            renderInput={(params) => <TextField {...params} label="Quote Asset"/>}
        />
        <Autocomplete
            disablePortal
            id="ticker-pairs"
            options={pairs}
            sx={{width: 300}}
            renderInput={(params) => <TextField {...params} label="Ticker Pairs"/>}
        />
    </Stack>;
}