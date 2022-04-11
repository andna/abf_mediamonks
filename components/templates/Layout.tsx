import Head from 'next/head';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import { Container, AppBar, Typography, Menu, MenuItem } from '@mui/material';
import React, { useState, useEffect } from "react";
import {Theme} from "@mui/system";
import Image from 'next/image'
import AppBarHome from "../organisms/AppBarHome";


type Props = {
    children?: React.ReactNode;
}
const styles = {

    appbar: {
        padding: '8px',
        display: 'flex',
        color: '#b0bbf8',
        fontSize: '0.8em',
        //userSelect: 'none'
    },
    footer: {
        //textAlign: 'center',
        zIndex: -1,
       // position: 'absolute',
        bottom: 0,
        width: '100%',
        fontSize: '0.6em',
        color: '#666',
    },
    github: {
        textDecoration: 'underline'
    },
    switcher: {
        cursor: 'pointer',
        paddingLeft: '16px',
        filter: 'grayscale(1) contrast(0.5) brightness(1.3)',
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
                main: '#3f51b5',
            },
            secondary: {
                main: '#f50057',
            },
            background: {
                default: '#1f222c',
                paper: '#2a2e3d',
            },
            text: {
                primary: '#ffffff',
                secondary: '#ffffff',
            },
        },
    });
    const themeLight : Theme = createTheme({
        palette: {
            //type: 'light',
            background: {
                default: '#d6dce6',
            },
        },
    });

    const title : string = 'ABF - Media.Monks Challenge';

    return <div>
        <Head>
            <title>{title}</title>
            <meta name="description" content="Andres Bastidas F - Media Monks Challenge" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <ThemeProvider theme={isDarkMode ? themeDark : themeLight}>
            <CssBaseline />
            <AppBarHome isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} title={title}/>
            <Container component="main" sx={styles.content}>
                {children}
            </Container>
        </ThemeProvider>
        <footer style={styles.footer}>
            <a
                href="https://github.com/andna/abf_mediamonks"
                target="_blank"
                rel="noopener noreferrer"
            >
                By Andres Bastidas Fierro @ 2022
            </a>
        </footer>
    </div>
}

export default Layout;

