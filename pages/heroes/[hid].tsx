import { useRouter } from 'next/router'

const HeroPage = () => {
    const router = useRouter()
    const {
        query: { pid },
    } = router
    return <p>Hero: {pid}</p>
}

export default HeroPage