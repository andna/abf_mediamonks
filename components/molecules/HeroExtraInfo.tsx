import React from "react";
import {Hero} from "../../types/Hero";
import {Badge, Grid, Tooltip} from "@mui/material";
import {ExtraInfo} from "../../types/ExtraInfo";
import {InnerData} from "../../types/InnerData";


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
        <Grid container justifyContent="center" spacing={2}>
            {extraInfo.map((info : ExtraInfo) => (
                    <Grid key={hero.name} item sx={{cursor:'help'}}>
                        {info.available > 0 &&
                        <Tooltip title={`${hero.name} has ${info.available} ${info.id}`} placement="top">
                            <Badge badgeContent={info.available} color="default">
                                {info.iconId}
                            </Badge>
                        </Tooltip>

                        }
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default HeroExtraInfo;