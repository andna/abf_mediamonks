import React from "react";
import {Hero} from "../../types/Hero";
import {Badge, Grid, Tooltip, Typography} from "@mui/material";
import {ExtraInfo} from "../../types/ExtraInfo";
import {InnerData} from "../../types/InnerData";
import colors from "../atoms/colors";


type Props = {
    hero: Hero;
}


const extraInfo: ExtraInfo[] = [
    {
        id: 'comics',
        iconId: 'C',
        available: 0,
    },
    {
        id: 'series',
        iconId: 'S',
        available: 0,
    },
    {
        id: 'stories',
        iconId: 'St',
        available: 0,
    }
]


const HeroExtraInfo: React.FC<Props> = ({hero }) => {
    extraInfo.forEach(info => {
        const heroInfo = hero[info.id as keyof Hero] as InnerData;
        info.available = heroInfo.available;
    })

    return (
        <Grid container justifyContent="center" spacing={3}
              sx={{ml: '-16px'}}>
            {extraInfo.map((info : ExtraInfo) => (
                    <Grid key={info.id} item sx={{cursor:'help'}}>
                        <Tooltip title={`${hero.name} has ${info.available} ${info.id} listed`}
                                 placement="top">
                            <Badge badgeContent={info.available} color="default">
                                <Typography color="secondary">{info.iconId}</Typography>
                            </Badge>
                        </Tooltip>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default HeroExtraInfo;