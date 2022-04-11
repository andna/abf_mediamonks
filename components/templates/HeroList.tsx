import React, {useEffect, useState} from "react";
import {Hero} from "../../types/Hero";
import HeroCard from "../organisms/HeroCard";
import {Grid} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../atoms/loader";

type Props = {
    searchTerm: string;
}

const HeroList: React.FC<Props> = ({ searchTerm }) => {


    const maxOffset = 60;
    const [totalHeroQuantity, setTotalHeroQuantity] = useState<number>(0);
    const [noHeroFound, setNoHeroFound] = useState<boolean>(false);
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [filteredHeroes, setFilteredHeroes] = useState<Hero[]>([]);
    const [shownHeroes, setShownHeroes] = useState<Hero[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getHeroes(0);
    }, [])

    useEffect(() => {
        filterHeroes(searchTerm);
    }, [searchTerm])


    const getHeroes = async (offset : number) => {
        if(heroes.length === 0 || heroes.length < totalHeroQuantity){
            const api = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=03f9346f8aac956d88e536fe9f8c09f0&hash=adf35804c14a8d61300fc2e8b9c3a0de&limit=${maxOffset}&offset=${offset}`;
            const response = await fetch(api).then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
                .then(json => {
                    const returnedHeroes : Hero[] = setSearchableString(json.data.results);
                    setHeroes(oldHeroes => [...oldHeroes, ...returnedHeroes]);
                    setFilteredHeroes(oldHeroes => [...oldHeroes, ...returnedHeroes]);

                    if(totalHeroQuantity === 0){
                        setTotalHeroQuantity(json.data.total);
                    }
                    const totalHeroes = json.data.total - maxOffset;
                    if (offset < totalHeroes) {
                        if(offset === 0){
                            setShownHeroes(returnedHeroes);
                        }
                        const newOffset = offset + maxOffset;
                        getHeroes(newOffset);
                    } else {
                        setLoading(false);
                    }
                })
                .catch(function (e) {
                    console.error(e)
                });
        } else {
            setLoading(false);
        }

    };


    const setSearchableString = (resultHeroes : []) => {
        return resultHeroes.map((hero : Hero) => {
            let searchableString = hero.name;
            hero.comics.items.forEach(item => searchableString += ` ${item.name}`);
            hero.series.items.forEach(item => searchableString += ` ${item.name}`);
            hero.stories.items.forEach(item => searchableString += ` ${item.name}`);
            hero.searchableString = searchableString;
            return hero;
        });
    }

    const showMoreHeroes = () => {
        setShownHeroes(oldShownHeroes => {
            const heroesSlice = filteredHeroes.slice(oldShownHeroes.length, oldShownHeroes.length + maxOffset)
            return [...oldShownHeroes, ...heroesSlice];
        });
    };

    const filterHeroes = (filterString : string) => {
        const newFilteredHeroes = heroes.filter((hero: Hero) => {
            const enters = hero.searchableString.toLowerCase().includes(filterString.toLowerCase());
            return enters;
        });
        setFilteredHeroes(newFilteredHeroes);
        const slicedHeroes = newFilteredHeroes.slice(0, maxOffset);
        setShownHeroes(slicedHeroes);
        setNoHeroFound(newFilteredHeroes.length === 0)
    }


    return (
            <>
                <InfiniteScroll
                    dataLength={shownHeroes.length}
                    next={showMoreHeroes}
                    hasMore={true}
                    loader={""}
                    scrollThreshold={1}
                    style={{ overflow: "unset", paddingTop: "64px" }}
                >
                    <Grid container justifyContent="center" spacing={2}>
                        {shownHeroes.map((hero: Hero) => (
                            <Grid key={hero.id} item>
                                <HeroCard  hero={hero}></HeroCard>
                            </Grid>
                        ))}
                    </Grid>
                </InfiniteScroll>
                {noHeroFound && heroes.length > 0 && searchTerm &&
                    <>
                        <h3>Nothing found for &#39;{searchTerm}&#39;
                        {loading && <>so far.</>}</h3>
                        {loading && <p>Please wait until all the data is loaded and then search again.</p>}
                    </>
                }
                {loading && <Loader />}
            </>
    )
}

export default HeroList;