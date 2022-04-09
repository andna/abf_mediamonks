import AuxCharacter from '../pages/api/auxCharacter'
import Layout from "../components/templates/Layout";
import HeroList from "../components/templates/HeroList";
import {Hero} from "../types/Hero";

export default function Home() {

    const heroes : Hero[] = [
        AuxCharacter,
        AuxCharacter,
    ]

  return (
    <Layout>
      <main>
          <HeroList heroes={heroes}/>
      </main>
    </Layout>
  )
}
