import Layout from "../components/templates/Layout";
import Loader from "../components/atoms/Loader";
import HeroList from "../components/templates/HeroList";
import {Hero} from "../types/Hero";
import {useState, useEffect} from "react";


export default function Home({ }) {

    const maxOffset = 100;
    const [loading, setLoading] = useState<boolean>(true);
    const [heroes, setHeroes] = useState<Hero[]>([]);

    useEffect(() => {
        getHeroes(0)
    }, [])


    const getHeroes = async (offset : number) => {
        const api = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=03f9346f8aac956d88e536fe9f8c09f0&hash=adf35804c14a8d61300fc2e8b9c3a0de&limit=100&offset=${offset}`;
        const response = await fetch(api).then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
            .then(json => {
                setHeroes(oldHeroes => [...oldHeroes, ...json.data.results]);

                const totalHeroes = json.data.total - maxOffset;
                if (offset < totalHeroes) {
                    const newOffset = offset + maxOffset;
                    getHeroes(newOffset);
                } else {
                    console.log('ggg',heroes.length)
                    setLoading(false);
                }
            })
            .catch(function (e) {
                console.error(e)
            });
    };

    return (
    <Layout>
      <main>
          {heroes.length > 0 && <HeroList heroes={heroes}/>}
          {loading && <Loader />}
      </main>
    </Layout>
    )
}
