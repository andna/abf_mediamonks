import { useRouter } from 'next/router'
import {useEffect, useState} from "react";
import Loader from "../../components/atoms/loader";
import {Hero} from "../../types/Hero";
import HeroCard from "../../components/organisms/HeroCard";

const HeroPage = () => {
    const router = useRouter()
    const {
        query: { hid },
    } = router

    const [ loading, setLoading ] = useState<boolean>(true);
    const [ hero, setHero ] = useState<Hero>({} as Hero);
    const [ heroThumbnailSrc, setHeroThumbnailSrc ] = useState<string | null>("");

    useEffect(()=>{
        if(!router.isReady) return;
        getHero(hid);

    }, [router.isReady]);



    const getHero = async (id: string | string[] | undefined) => {

            const api = `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=03f9346f8aac956d88e536fe9f8c09f0&hash=adf35804c14a8d61300fc2e8b9c3a0de`;
            const response = await fetch(api).then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
                .then(json => {
                        setLoading(false);
                        setHero(json.data.results[0]);
                })
                .catch(function (e) {
                    console.error(e)
                });

    };


    return <>
        {loading && <Loader />}
        {hero && hero.name && <HeroCard hero={hero} isPage/>}
    </>
}

export default HeroPage