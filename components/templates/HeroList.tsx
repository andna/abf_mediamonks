import React from "react";
import {Hero} from "../../types/Hero";
import HeroCard from "../organisms/HeroCard";


type Props = {
    heroes: Hero[];
}
const HeroList: React.FC<Props> = ({heroes }) => {
    return <>
        {heroes.map((hero: Hero) =>
            <HeroCard key={hero.name} hero={hero}></HeroCard>)}
    </>;
}

export default HeroList;