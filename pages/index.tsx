import Layout from "../components/templates/Layout";
import Loader from "../components/atoms/Loader";
import HeroList from "../components/templates/HeroList";
import React, {useState, useEffect} from "react";
import Search from "../components/molecules/Search";


export default function Home({ }) {


    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (event : React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }
    return (
    <Layout>
      <main>
          <Search searchTerm={searchTerm}
                  eraseSearch={() => setSearchTerm("")}
                  handleSearch={handleSearch}/>
          <HeroList searchTerm={searchTerm} setLoading={setLoading}/>
          {loading && <Loader />}
      </main>
    </Layout>
    )
}
