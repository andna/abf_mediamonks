import React from "react";
import {AppBar, Typography} from "@mui/material";
import Image from "next/image";

const styles = {

    appbar: {
        padding: '8px',
        display: 'flex',
        color: '#b0bbf8',
        fontSize: '0.8em',
        //userSelect: 'none'
    },
    switcher: {
        cursor: 'pointer',
        paddingLeft: '16px',
        filter: 'grayscale(1) contrast(0.5) brightness(1.3)',
    },
}

type Props = {
    isDarkMode: boolean;
    setIsDarkMode: (isDarkMode : boolean) => any;
    title: string;
}
const AppBarHome: React.FC<Props> = ({isDarkMode, setIsDarkMode, title }) => {


    return (
        <AppBar>
            <div style={styles.appbar}>

                {false && <Image src="/arcLogo.svg" alt="Vercel Logo" width={72} height={16} />}
                <Typography component="div" sx={{ flexGrow: 1 }}>
                    { title }
                </Typography>
                <span style={styles.switcher}
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      title={`Change to ${isDarkMode ? `Light` : `Dark`} theme`}>
                            {isDarkMode ? ' 🌙' : ' 🔆'}
                        </span>
            </div>
        </AppBar>
    )
}

export default AppBarHome;