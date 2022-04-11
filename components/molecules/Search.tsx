import React from "react";
import {Box, InputAdornment, TextField} from "@mui/material";
import {Search as SearchIcon, Close} from "@mui/icons-material";

const styles = {
    endAdorment : {
        color: 'inherit',
        cursor: 'pointer'
    },
    input: {
        height: 40
    }
}

type Props = {
    searchTerm: string;
    handleSearch: React.ChangeEventHandler<HTMLInputElement>;
    eraseSearch: () => any;
}
const Search: React.FC<Props> = ({ searchTerm, handleSearch, eraseSearch }) => {

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, mb: 8, width: '35ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-basic"
                placeholder="by name, comics, stories, series"
                label="Search"
                variant="outlined"
                color="secondary"
                sx={styles.input}
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                   endAdornment: (
                       <InputAdornment position="end" sx={styles.endAdorment}>
                           {searchTerm
                               ?
                               <Close onClick={() => eraseSearch()}/>
                               :
                               <SearchIcon/>
                           }
                       </InputAdornment>
                   ),
                }}
            />
        </Box>
    )
}

export default Search;