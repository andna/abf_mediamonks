import React from "react";
import {Box, InputAdornment, TextField, useTheme} from "@mui/material";
import {Search as SearchIcon, Close} from "@mui/icons-material";

const styles = {
    endAdorment : {
        color: 'inherit',
        cursor: 'pointer'
    },
    input: {
        height: 40
    },
    container: {
        position: 'fixed',
         borderRadius: 3,
        padding: 1.6,
        zIndex: 2,
        top: 35,
        width: '100%',
        textAlign: 'center',
    }
}

type Props = {
    searchTerm: string;
    handleSearch: React.ChangeEventHandler<HTMLInputElement>;
    eraseSearch: () => any;
}
const Search: React.FC<Props> = ({ searchTerm, handleSearch, eraseSearch }) => {

    const theme = useTheme();
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { mb: 1, width: '35ch' },
                ...styles.container,
                background: theme.palette.background.default
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