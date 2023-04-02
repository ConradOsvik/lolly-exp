'use client'

import { regionAtom, summonerAtom } from '@/store'
import RegionSelect from './regionselect'
import { useAtom } from 'jotai'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function Search() {
    const [summoner, setSummoner] = useAtom(summonerAtom)
    const [region] = useAtom(regionAtom)
    const router = useRouter()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (region !== undefined && summoner !== '')
            router.push(`/${region}/${summoner}`)
    }

    return (
        <form
            className="m-16 flex w-[700px] items-center justify-center rounded-xl bg-white shadow-md"
            onSubmit={handleSubmit}
        >
            <RegionSelect />
            <input
                className="h-full w-full min-w-0 bg-transparent px-4 text-2xl outline-none placeholder:capitalize placeholder:text-gray-400"
                placeholder="Summoner"
                value={summoner}
                onChange={(e) => setSummoner(e.target.value)}
            />
            <button className="m-2 rounded-xl bg-violet-600/25 p-4 text-xl font-medium text-violet-600 outline-none duration-300 hover:bg-violet-500/50 focus-visible:shadow-focus-ring active:bg-violet-500/75">
                Search
            </button>
        </form>
    )
}
