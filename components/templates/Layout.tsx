import Head from 'next/head';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from '@mui/material';
import React, { useState } from "react";
import {Theme} from "@mui/system";
import colors from "../atoms/colors";
import AppBarHome from "../organisms/AppBarHome";


type Props = {
    children?: React.ReactNode;
}
const styles = {

    footer: {
        textAlign: 'center' as 'center',
        zIndex: -1,
        position: 'absolute' as 'absolute',
        bottom: 0,
        width: '100%',
        fontSize: '0.6em',
        color: colors.footerColor,
    },
    content: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}


const Layout: React.FC<Props> = ({
    children
}) => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const themeDark : Theme = createTheme({
        palette: {
            //type: 'dark',
            primary: {
                main: colors.blueBright,
            },
            secondary: {
                main: colors.redBright,
            },
            background: {
                default: colors.blueDark,
                paper: colors.bluePale,
            },
            text: {
                primary: colors.white,
                secondary: colors.white,
            },
        },
    });
    const themeLight : Theme = createTheme({
        palette: {
            //type: 'light',
            primary: {
                main: colors.blueBright,
            },
            background: {
                default: colors.lightGray,
            },
            text: {
                primary: colors.textLight,
            },
        },
    });

    const title : string = 'ABF - Marvel Monks';

    return <div>
        <Head>
            <title>{title}</title>
            <meta name="description" content="Andres Bastidas F - Media Monks Challenge" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            <ThemeProvider theme={isDarkMode ? themeDark : themeLight}>
                <CssBaseline />
                <AppBarHome isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} title={title}/>
                <Container component="main" sx={styles.content}>
                    {children}
                </Container>
            </ThemeProvider>
        </main>
        <footer>
            <a
                href="https://github.com/andna/abf_mediamonks"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.footer}
            >
                By Andres Bastidas Fierro @ 2022
            </a>
        </footer>
    </div>
}

export default Layout;

