import React from "react";
import {Hero} from "../../types/Hero";
import {Card, Badge, Button, CardActions, CardContent, Typography, Avatar, Tooltip} from "@mui/material";
import HeroExtraInfo from "../molecules/HeroExtraInfo";
import Link from 'next/link'
import colors from "../atoms/colors";

type Props = {
    hero: Hero;
}

const styles = {
    card: {width: 350, marginBottom: 2},
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
    nameContainer: {
        flex: 1,
        paddingLeft: 8
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
    }
}


const HeroCard: React.FC<Props> = ({hero}) => {

    const notFoundThumb = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available';
    const notFoundThumb2 = 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708';
    const heroThumbnailProp = (hero.thumbnail.path === notFoundThumb) || (hero.thumbnail.path === notFoundThumb2)
        ? {}
        : {src : `${hero.thumbnail.path}.${hero.thumbnail.extension}`};

    const links = hero.urls;
    const wikiLink = links.find(link => link.type === "wiki")?.url;
    const nameSplitParenthesis = hero.name.split("(");
    const heroName = nameSplitParenthesis[0];
    const heroSubName = nameSplitParenthesis[1]?.replace(")","");

    return <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
            <Avatar alt={hero.name}
                    sx={styles.avatar}
                    {...heroThumbnailProp}
            >
                {!heroThumbnailProp.src && hero.name.slice(0, 2)}
            </Avatar>
            <div style={styles.nameContainer}>

                <Typography variant={'h6'}
                            sx={styles.name}
                >
                    {heroName}
                </Typography>
                <Typography variant={'caption'}
                            sx={styles.subName}>
                    {heroSubName}
                </Typography>
            </div>
            {wikiLink &&
                <Tooltip title={`Go to ${hero.name}'s Wiki`} placement="top">
                    <a href={wikiLink} target="_blank" rel="noreferrer">↗️</a>
                </Tooltip>
            }

        </CardContent>
        <CardActions>
            <div>
                <HeroExtraInfo hero={hero}/>
            </div>

            <Link href={`/heroes/abc`}>
                <Button variant="contained"
                        sx={{marginLeft: "auto",}}
                >
                    Details
                </Button>
            </Link>
        </CardActions>
    </Card>
}

export default HeroCard;