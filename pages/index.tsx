import Layout from "../components/templates/Layout";
import HeroList from "../components/templates/HeroList";
import React, {useState} from "react";
import Search from "../components/molecules/Search";
import Loader from "../components/atoms/loader";


export default function Home({ }) {

    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (event : React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }
    return (
        <>
            <Search searchTerm={searchTerm}
                    eraseSearch={() => setSearchTerm("")}
                    handleSearch={handleSearch}/>
            <HeroList searchTerm={searchTerm}/>
        </>
    )
}
