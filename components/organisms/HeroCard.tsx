import React, {useEffect, useState} from "react";
import {Hero} from "../../types/Hero";
import {
    Card, Button, CardActions,
    CardContent, Typography, Avatar, Tooltip, useTheme, Grid,
} from "@mui/material";
import HeroExtraInfo from "../molecules/HeroExtraInfo";
import Link from 'next/link'
import colors from "../atoms/colors";
import {ExtraInfo} from "../../types/ExtraInfo";
import {InnerData} from "../../types/InnerData";
import HeroLinks from "../molecules/HeroLinks";
import {Close, Delete, DeleteOutline, LibraryBooks, MenuBook, Star, StarBorderOutlined, Tv} from "@mui/icons-material";
import useMediaQuery from '@mui/material/useMediaQuery';
import hid from "../../pages/heroes/[hid]";

type Props = {
    hero: Hero;
    isPage?: boolean;
    isFilteredByFavorites: boolean;
}


const HeroCard: React.FC<Props> = ({hero, isPage = null, isFilteredByFavorites}) => {

    const theme = useTheme();
    const notFoundThumb = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available';
    const notFoundThumb2 = 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708';
    const heroThumbnailProp = (hero.thumbnail.path === notFoundThumb) || (hero.thumbnail.path === notFoundThumb2)
        ? {}
        : {src : `${hero.thumbnail.path}.${hero.thumbnail.extension}`};

    const links = hero.urls;
    const wikiLink = links.find(link => link.type === "wiki")?.url;
    const comicsLink = links.find(link => link.type === "comiclink")?.url;
    const nameSplitParenthesis = hero.name.split("(");
    const heroName = nameSplitParenthesis[0];
    const heroSubName = nameSplitParenthesis[1]?.replace(")","");


    const styles = {
        card: {width: 350, marginBottom: 2},
        cardPage: {width: "100%", maxWidth: 800},
        cardContent: {
            display: 'flex',
            alignItems: 'start',
            flex: 1,
            justifyContent: 'space-between',
        },
        avatar: {
            bgcolor: colors.avatarBg,
            boxShadow: '0 3px 6px rgb(0 0 0 / 30%)',
        },
        avatarPage: {
            boxShadow: '0 3px 6px rgb(0 0 0 / 30%)',
            borderRadius: 20,
            border: '10px solid white'
        },
        nameContainer: {
            flex: 1,
            paddingLeft: 8
        },
        nameContainerPage: {
            flex: 1,
            paddingLeft: 24
        },
        name: {
            fontWeight: 800,
            lineHeight: 2
        },
        nameSmall: {
            fontWeight: 800,
            lineHeight: 2,
            fontSize: 14
        },
        subName: {
            fontWeight: 300,
            lineHeight: 0.1,
            position: 'relative',
            marginBottom: -4,
            display: 'block',
            top: 0,
        },
        description: {
            fontWeight: 300,
            opacity: 0.6,
            lineHeight: 1.4,
            display: 'block',
            marginTop: 8,
            overflow: 'hidden',
            maxWidth: useMediaQuery(theme.breakpoints.up('sm')) ? '100%' : '85%'
        },
        comicslink: {
            fontWeight: 300,
            textAlign: 'center' as 'center',
            width: '100%',
            display: 'block',
            textDecoration: 'underline'
        },
        favoriter: {
            cursor: 'pointer'
        },
        hide: {
            display: 'none'
        },
        deleters: {
            marginRight: 1,
            opacity: 0.2,
            cursor: 'pointer'
        }
    }


    const extraInfo: ExtraInfo[] = [
        {
            id: 'comics',
            iconId: <MenuBook />,
            available: 0,
            items: [],
        },
        {
            id: 'series',
            iconId: <Tv />,
            available: 0,
            items: [],
        },
        {
            id: 'stories',
            iconId: <LibraryBooks />,
            available: 0,
            items: [],
        }
    ];
    extraInfo.forEach(info => {
        const heroInfo = hero[info.id as keyof Hero] as InnerData;
        info.available = heroInfo.available;
        info.items = heroInfo.items;
    });

    const [isFavorite, setIsFavorite] = useState<boolean>();
    const [isDeleted, setIsDeleted] = useState<boolean>();
    const [startedDelete, setStartedDelete] = useState<boolean>();

    const setAsFavorite = () => {
        const newFavorite = !isFavorite;
        localStorage.setItem(`hero#${hero.id}`, newFavorite ? 'true' : 'false');
        setIsFavorite(newFavorite);
    }

    const setDeleted = () => {
        localStorage.setItem(`deleted-hero#${hero.id}`, 'true');
        setIsDeleted(true)
    }

    useEffect(() => {
        setIsFavorite(localStorage.getItem(`hero#${hero.id}`) === 'true');setIsDeleted(localStorage.getItem(`deleted-hero#${hero.id}`) === 'true');
        setIsDeleted(localStorage.getItem(`deleted-hero#${hero.id}`) === 'true');

    }, []);

    return <Grid key={hero.id} item sx={{...(((isFilteredByFavorites && !isFavorite) || isDeleted) && styles.hide)}}>
            <Card sx={isPage ? styles.cardPage : styles.card}>
            <CardContent sx={isPage ? styles.cardContent : styles.cardContent}>
                {isPage && heroThumbnailProp.src ?
                    <a href={heroThumbnailProp.src} target="_blank" rel="noreferrer">
                        <img
                            height="200"
                            src={heroThumbnailProp.src}
                            alt="survey img"
                            style={styles.avatarPage}
                        />
                    </a>
                    :
                    <Avatar alt={hero.name}
                                        sx={styles.avatar}
                                        {...heroThumbnailProp}
                    >
                        {!heroThumbnailProp.src && hero.name.slice(0, 2)}
                    </Avatar>
                }
                <div style={isPage ? styles.nameContainerPage : styles.nameContainer}>

                    <Typography variant={isPage ? 'h5' : 'h6'}
                                sx={heroName.length < 16 ? styles.name : styles.nameSmall}
                                color={isPage ? "secondary" : "default"}
                    >
                        {heroName}
                    </Typography>
                    <Typography variant={'caption'}
                                sx={styles.subName}>
                        {heroSubName}
                    </Typography>
                    {isPage &&
                        <Typography variant={'caption'}
                                    sx={styles.description}>
                            {hero.description}
                        </Typography>
                    }
                </div>
                <div style={styles.favoriter} onClick={setAsFavorite}>
                    <Tooltip title={`${isFavorite ? `Unset`: `Set`} as Favorite`}>
                        { isFavorite ?
                            <Star color="secondary"/>
                            :
                            <StarBorderOutlined />
                        }
                    </Tooltip>

                </div>

            </CardContent>

            {isPage ?
                <CardContent>
                    <Typography variant={'caption'}>
                        {wikiLink ?
                            <a style={styles.comicslink}
                               href={wikiLink} target="_blank" rel="noreferrer">
                                Go to Wiki
                            </a>
                            :
                            <p style={{textAlign: 'center'}}>Has no wiki.</p>
                        }
                    </Typography>
                    <Typography variant={'caption'}
                                sx={styles.comicslink}>
                        <a href={comicsLink} target="_blank" rel="noreferrer" >
                            Go to Comics Page
                        </a>
                    </Typography>
                    <HeroLinks extraInfo={extraInfo}/>
                </CardContent>
                :
                <CardActions>
                    <div>
                        <HeroExtraInfo extraInfo={extraInfo} hero={hero}/>
                    </div>

                    <div style={{marginLeft: "auto", display: 'flex', alignItems: 'center'}}>

                        {startedDelete ? <>

                                <Tooltip title="Don't delete">
                                        <Close sx={styles.deleters} onClick={() => setStartedDelete(false)}/>
                                </Tooltip>
                                <Tooltip title="Are you sure about Deleting them?">
                                    <Delete sx={styles.deleters} onClick={() => setDeleted()}/>
                                </Tooltip>
                             </>
                            :
                            <Tooltip title="Delete this hero?">
                                <DeleteOutline sx={styles.deleters} onClick={() => setStartedDelete(true)}/>
                            </Tooltip>
                        }
                        <Link href={`/heroes/${hero.id}`}>
                            <Button variant="contained"
                            >
                                Details
                            </Button>
                        </Link>
                    </div>
                </CardActions>
            }
        </Card>
    </Grid>
}

export default HeroCard;