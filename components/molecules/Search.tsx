import React from "react";
import {Box, InputAdornment, TextField, Tooltip, useTheme} from "@mui/material";
import {Search as SearchIcon, Close, Star, StarBorderOutlined} from "@mui/icons-material";

const styles = {
    endAdorment : {
        color: 'inherit',
        cursor: 'pointer'
    },
    input: {
        flex: 1,
        marginRight: 2
    },
    box: {
        position: 'fixed',
         borderRadius: 3,
        padding: 1.6,
        zIndex: 2,
        top: 35,
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        width: 350,
        paddingRight: 12
    },
    favoriter: {
        cursor: 'pointer'
    }
}

type Props = {
    searchTerm: string;
    handleSearch: React.ChangeEventHandler<HTMLInputElement>;
    eraseSearch: () => any;
    isFilteredByFavorite: boolean;
    setFilterByFavorite: () => any;
}
const Search: React.FC<Props> = ({ searchTerm,
                                     handleSearch,
                                     eraseSearch,
                                     isFilteredByFavorite = false,
                                     setFilterByFavorite}) => {

    const theme = useTheme();
    return (
        <Box
            component="form"
            sx={{
                ...styles.box,
                background: theme.palette.background.default
            }}
            noValidate
            autoComplete="off"
        >
            <div style={styles.container}>
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

                <div style={styles.favoriter} onClick={setFilterByFavorite}>
                    <Tooltip title={`${isFilteredByFavorite ? `Unfilter`: `Filter`} by Favorites`}>
                        { isFilteredByFavorite ?
                            <Star color="secondary"/>
                            :
                            <StarBorderOutlined />
                        }
                    </Tooltip>
                </div>
            </div>

        </Box>
    )
}

export default Search;