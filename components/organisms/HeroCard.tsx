import React from "react";
import {Hero} from "../../types/Hero";
import {Card, Button, CardActions,
    CardContent, Typography, Avatar, Tooltip,
} from "@mui/material";
import HeroExtraInfo from "../molecules/HeroExtraInfo";
import Link from 'next/link'
import colors from "../atoms/colors";
import {ExtraInfo} from "../../types/ExtraInfo";
import {InnerData} from "../../types/InnerData";
import HeroLinks from "../molecules/HeroLinks";

type Props = {
    hero: Hero;
    isPage?: boolean;
}

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
        overflow: 'hidden'
    },
    comicslink: {
        fontWeight: 300,
        textAlign: 'center' as 'center',
        width: '100%',
        display: 'block',
        textDecoration: 'underline'
    }
}


const HeroCard: React.FC<Props> = ({hero, isPage = null}) => {

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


    const extraInfo: ExtraInfo[] = [
        {
            id: 'comics',
            iconId: 'C',
            available: 0,
            items: [],
        },
        {
            id: 'series',
            iconId: 'S',
            available: 0,
            items: [],
        },
        {
            id: 'stories',
            iconId: 'St',
            available: 0,
            items: [],
        }
    ];
    extraInfo.forEach(info => {
        const heroInfo = hero[info.id as keyof Hero] as InnerData;
        info.available = heroInfo.available;
        info.items = heroInfo.items;
    });


    console.log(hero);
    return <Card sx={isPage ? styles.cardPage : styles.card}>
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
                            sx={styles.name}
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
            {wikiLink && !isPage &&
                <Tooltip title={`Go to ${hero.name}'s Wiki`} placement="top">
                    <a href={wikiLink} target="_blank" rel="noreferrer">↗️</a>
                </Tooltip>
            }

        </CardContent>

        {isPage ?
            <CardContent>
                <Typography variant={'caption'}
                            sx={styles.comicslink}>
                    <a href={wikiLink} target="_blank" rel="noreferrer" >
                       Go to Wiki
                    </a>
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

                <Link href={`/heroes/${hero.id}`}>
                    <Button variant="contained"
                            sx={{marginLeft: "auto",}}
                    >
                        Details
                    </Button>
                </Link>
            </CardActions>
        }
    </Card>
}

export default HeroCard;