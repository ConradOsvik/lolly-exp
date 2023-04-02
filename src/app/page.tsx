import Search from '@/components/home/search'
import Image from 'next/image'

export const metadata = {
    title: 'Lolly',
    description: 'Homepage of Lolly.gg'
}

export default function Home() {
    return (
        <>
            <Image
                src="/lollipoppy.jpg"
                alt="Lollipoppy splash art"
                width={700}
                height={700}
                className="mt-10 h-auto w-auto rounded-xl shadow-lg"
            />
            <Search />
        </>
    )
}
