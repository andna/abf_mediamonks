import React from "react";
import {Hero} from "../../types/Hero";
import {Badge, Grid, Tooltip, Typography, useTheme} from "@mui/material";
import {ExtraInfo} from "../../types/ExtraInfo";
type Props = {
    hero: Hero;
    extraInfo: ExtraInfo[];
}




const HeroExtraInfo: React.FC<Props> = ({hero, extraInfo }) => {


    const theme = useTheme();

    return (
        <Grid container justifyContent="center" spacing={3}
              sx={{ml: '-16px'}}>
            {extraInfo.map((info : ExtraInfo) => {
                return (
                    <Grid key={info.id} item sx={{cursor:'help'}}>
                        <Tooltip title={`${hero.name} has ${info.available} ${info.id} listed`}
                                 placement="top">
                            <Badge badgeContent={info.available}
                                   anchorOrigin={{vertical: 'bottom',horizontal: 'right',}}
                                   sx={{
                                       "& .MuiBadge-badge": {
                                           color: theme.palette.secondary.main,
                                           top: 2,
                                           right: -4,
                                           backgroundColor: theme.palette.background.paper
                                       }
                                   }}>
                                <Typography color="default"
                                            sx={{opacity: info.available ? 1 : 0.2}}>
                                    {info.iconId}
                                </Typography>
                            </Badge>
                        </Tooltip>
                    </Grid>
                )
             })
            }
        </Grid>
    )
}

export default HeroExtraInfo;