import React from "react";
import {Hero} from "../../types/Hero";
import {Badge, Grid, Tooltip, Typography} from "@mui/material";
import {ExtraInfo} from "../../types/ExtraInfo";


type Props = {
    hero: Hero;
    extraInfo: ExtraInfo[];
}




const HeroExtraInfo: React.FC<Props> = ({hero, extraInfo }) => {


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