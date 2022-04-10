import React from "react";
import {Hero} from "../../types/Hero";
import {Card, Badge, Button, CardActions, CardContent, CardMedia, Typography, Avatar, Tooltip} from "@mui/material";
import Link from 'next/link'
import HeroExtraInfo from "../molecules/HeroExtraInfo";

type Props = {
    hero: Hero;
}

const styles = {
    card: {width: 350, marginBottom: 2},
    cardContent: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
    },
    avatar: { bgcolor: '#fff' },
    name: { fontWeight: 800,
        flex: 1,
        textAlign: 'left'
    },

}


const HeroList: React.FC<Props> = ({hero}) => {

    const heroThumbnail = `${hero.thumbnail.path}.${hero.thumbnail.extension}`

    const links = hero.urls;
    const wikiLink = links.find(link => link.type === "wiki")?.url;

    return <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
            <Avatar alt={hero.name}
                    sx={styles.avatar}
                    src={heroThumbnail}/>
            <Typography variant={'h6'}
                        sx={styles.name}
            >
                {hero.name}
            </Typography>
            {wikiLink &&
                <Tooltip title={`Go to ${hero.name}'s Wiki`}  placement="top">
                    <a href={wikiLink} target="_blank" rel="noreferrer">↗️</a>
                </Tooltip>
            }

        </CardContent>
        <CardActions>
            <div>
                <HeroExtraInfo hero={hero}/>
            </div>

            <Button variant="contained"
                    sx={{marginLeft: "auto",}}
            >
                View Details
            </Button>
        </CardActions>
    </Card>
}

export default HeroList;