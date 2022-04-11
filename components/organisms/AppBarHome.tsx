import React from "react";
import {AppBar, Typography, Tooltip, Button} from "@mui/material";
import Image from "next/image";
import colors from "../atoms/colors";
import {useRouter} from "next/router";
import Link from 'next/link'
import {  Close} from "@mui/icons-material";

const styles = {

    appbar: {
        padding: '8px',
        display: 'flex',
        color: colors.appbarColor,
        fontSize: '0.8em',
        userSelect: 'none' as 'none',
    },
    switcher: {
        cursor: 'pointer',
        paddingLeft: 2,
        filter: 'grayscale(1) contrast(0.5) brightness(1.3)',
    },
    backer: {
        cursor: 'pointer',
        paddingRight: 2,
        marginRight: 4
    }
}

type Props = {
    isDarkMode: boolean;
    setIsDarkMode: (isDarkMode : boolean) => any;
    title: string;
}
const AppBarHome: React.FC<Props> = ({isDarkMode, setIsDarkMode, title }) => {


    const { asPath } = useRouter()

    return (
        <AppBar>
            <div style={styles.appbar}>

                {asPath === "/" ? <></> :

                    <Link href={`/`}>
                        <Close style={styles.backer} />
                    </Link>
                }
                {false && <Image src="/arcLogo.svg" alt="Vercel Logo" width={72} height={16} />}
                <Typography component="div" sx={{ flexGrow: 1 }}>
                    { title }
                </Typography>
                <Tooltip title={`Change to ${isDarkMode ? `Light` : `Dark`} theme`}
                         placement="left">
                <span style={styles.switcher}
                      onClick={() => setIsDarkMode(!isDarkMode)}>
                            {isDarkMode ? ' 🌙' : ' 🔆'}
                        </span>
                </Tooltip>
            </div>
        </AppBar>
    )
}

export default AppBarHome;