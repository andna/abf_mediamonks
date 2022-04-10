import React from "react";
import {Hero} from "../../types/Hero";
import HeroCard from "../organisms/HeroCard";
import {Grid} from "@mui/material";


type Props = {
    heroes: Hero[];
}
const HeroList: React.FC<Props> = ({heroes }) => {
    return (
        <Grid container justifyContent="center" spacing={2}>
            {heroes.map((hero: Hero) => (
                <Grid key={hero.name} item>
                    <HeroCard  hero={hero}></HeroCard>
                </Grid>
            ))}
        </Grid>
    )
}

export default HeroList;