'use client'

import {
    Root,
    Trigger,
    Value,
    Portal,
    Content,
    ScrollUpButton,
    ScrollDownButton,
    Viewport,
    Group,
    Label,
    Item,
    ItemText,
    Separator
} from '@radix-ui/react-select'
import { usePathname, useRouter } from 'next/navigation'
import DarkmodeToggle from '../common/darkmodetoggle'
import {
    ChevronDownIcon,
    ChevronUpIcon,
    MagnifyingGlassIcon,
    MapPinIcon
} from '@heroicons/react/24/solid'
import { FormEvent } from 'react'
import { useAtom } from 'jotai'
import { regionAtom, summonerAtom } from '@/store'

const REGIONS = [
    {
        label: 'Europe',
        subregions: [
            {
                name: 'Europe West',
                value: 'euw'
            },
            {
                name: 'Europe Nordic & East',
                value: 'eune'
            },
            {
                name: 'Russia',
                value: 'russia'
            },
            {
                name: 'Turkey',
                value: 'turkey'
            }
        ]
    },
    {
        label: 'North America',
        subregions: [
            {
                name: 'North America',
                value: 'na'
            },
            {
                name: 'Latin America South',
                value: 'las'
            },
            {
                name: 'Latin America North',
                value: 'lan'
            },
            {
                name: 'Brazil',
                value: 'brazil'
            }
        ]
    },
    {
        label: 'Asia',
        subregions: [
            {
                name: 'Oceania',
                value: 'oce'
            },
            {
                name: 'Korea',
                value: 'korea'
            },
            {
                name: 'Japan',
                value: 'japan'
            }
        ]
    }
]

function RegionSelect() {
    const [region, setRegion] = useAtom(regionAtom)

    const handleChange = (value: string) => {
        setRegion(value)
    }

    return (
        <Root onValueChange={handleChange} value={region}>
            <Trigger asChild>
                <button className="m-2 flex items-center justify-center rounded-lg bg-violet-600/25 p-2 text-violet-600 outline-none duration-300 hover:bg-violet-600/50 focus-visible:shadow-focus-ring active:bg-violet-500/75">
                    <MapPinIcon width={24} />
                </button>
            </Trigger>
            <Portal>
                <Content
                    className="rounded-lg bg-white p-4 shadow-md"
                    position="popper"
                >
                    <ScrollUpButton className="flex items-center justify-center rounded-lg p-2 hover:bg-violet-600/25 hover:text-violet-600">
                        <ChevronUpIcon width={20} />
                    </ScrollUpButton>
                    <Viewport>
                        {REGIONS.map((region) => (
                            <Group key={region.label}>
                                <Label className="text-sm capitalize text-gray-400">
                                    {region.label}
                                </Label>
                                {region.subregions.map((area) => (
                                    <Item
                                        className="text-md cursor-pointer select-none rounded-lg p-2 font-medium capitalize text-gray-900 outline-none hover:bg-violet-600/25 focus:bg-violet-600/25 data-[state=checked]:bg-violet-600/50 data-[state=checked]:text-violet-600"
                                        key={area.value}
                                        value={area.value}
                                    >
                                        <ItemText>{area.name}</ItemText>
                                    </Item>
                                ))}
                                <Separator />
                            </Group>
                        ))}
                    </Viewport>
                    <ScrollDownButton className="flex items-center justify-center rounded-lg p-2 hover:bg-violet-600/25 hover:text-violet-600">
                        <ChevronDownIcon width={20} />
                    </ScrollDownButton>
                </Content>
            </Portal>
        </Root>
    )
}

export default function Header() {
    const [summoner, setSummoner] = useAtom(summonerAtom)
    const [region] = useAtom(regionAtom)
    const path = usePathname()
    const router = useRouter()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (
            region !== undefined &&
            summoner !== '' &&
            path !== `/${region}/${summoner}`
        )
            router.push(`/${region}/${summoner}`)
    }

    return (
        <header className="fixed top-0 z-[1000] w-full bg-white/70 shadow-md backdrop-blur-sm">
            <nav className="flex min-h-[80px] w-full items-center justify-center">
                <div className="flex w-full flex-[1] items-center justify-end">
                    <span className="text-2xl font-bold text-violet-600">
                        Lolly
                    </span>
                </div>
                <div className="flex w-full flex-[2] items-center justify-center">
                    {path === '/' ? null : (
                        <form
                            className="flex w-[400px] items-center justify-center rounded-lg bg-gray-100"
                            onSubmit={handleSubmit}
                        >
                            <RegionSelect />
                            <input
                                className="h-full w-full bg-transparent px-1 text-xl outline-none placeholder:capitalize placeholder:text-gray-400"
                                placeholder="summoner"
                                value={summoner}
                                onChange={(e) => setSummoner(e.target.value)}
                            />
                            <button className="m-2 flex items-center justify-center rounded-lg bg-violet-600/25 p-2 text-violet-600 outline-none duration-300 hover:bg-violet-600/50 focus-visible:shadow-focus-ring active:bg-violet-500/75">
                                <MagnifyingGlassIcon width={24} />
                            </button>
                        </form>
                    )}
                </div>
                <div className="flex w-full flex-[1] items-center justify-start">
                    <DarkmodeToggle />
                </div>
            </nav>
        </header>
    )
}
