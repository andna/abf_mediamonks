import Layout from "../components/templates/Layout";
import HeroList from "../components/templates/HeroList";
import React, {useState} from "react";
import Search from "../components/molecules/Search";
import Loader from "../components/atoms/loader";


export default function Home({ }) {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isFilteredByFavorites, setIsFilteredByFavorites] = useState<boolean>(false);

    const handleSearch = (event : React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }
    return (
        <>
            <Search searchTerm={searchTerm}
                    eraseSearch={() => setSearchTerm("")}
                    isFilteredByFavorite={isFilteredByFavorites}
                    setFilterByFavorite={() => setIsFilteredByFavorites(!isFilteredByFavorites)}
                    handleSearch={handleSearch}/>
            <HeroList isFilteredByFavorites={isFilteredByFavorites}
                      searchTerm={searchTerm}/>
        </>
    )
}
