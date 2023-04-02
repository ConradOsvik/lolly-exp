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
import {
    ChevronDownIcon,
    ChevronUpIcon,
    GlobeAltIcon,
    GlobeAmericasIcon,
    GlobeAsiaAustraliaIcon,
    GlobeEuropeAfricaIcon
} from '@heroicons/react/24/solid'
import { useAtom } from 'jotai'
import { regionAtom } from '@/store'

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

export default function RegionSelect() {
    const [region, setRegion] = useAtom(regionAtom)

    const handleChange = (value: string) => {
        setRegion(value)
    }

    return (
        <Root onValueChange={handleChange} value={region}>
            <Trigger asChild>
                <button className="m-2 flex items-center justify-center whitespace-nowrap rounded-xl bg-violet-600/25 p-4 text-xl font-medium text-violet-600 outline-none duration-300 hover:bg-violet-600/50 focus-visible:shadow-focus-ring active:bg-violet-500/75">
                    {REGIONS[0].subregions.some(
                        (reg) => reg.value === region
                    ) ? (
                        <GlobeEuropeAfricaIcon
                            key="globeeurope"
                            width={30}
                            className="mr-2"
                        />
                    ) : REGIONS[1].subregions.some(
                          (reg) => reg.value === region
                      ) ? (
                        <GlobeAmericasIcon
                            key="globeamericas"
                            width={30}
                            className="mr-2"
                        />
                    ) : REGIONS[2].subregions.some(
                          (reg) => reg.value === region
                      ) ? (
                        <GlobeAsiaAustraliaIcon
                            key="globeasia"
                            width={30}
                            className="mr-2"
                        />
                    ) : (
                        <GlobeAltIcon width={30} className="mr-2" />
                    )}
                    <Value
                        className="text-xl font-medium capitalize text-violet-600"
                        placeholder="select region"
                    />
                </button>
            </Trigger>
            <Portal>
                <Content className="rounded-lg bg-white p-4 shadow-md">
                    <ScrollUpButton className="flex items-center justify-center rounded-lg p-2 hover:bg-violet-600/25 hover:text-violet-600">
                        <ChevronUpIcon width={20} />
                    </ScrollUpButton>
                    <Viewport>
                        {REGIONS.map((region) => (
                            <Group key={region.label}>
                                <Label className="text-md capitalize text-gray-400">
                                    {region.label}
                                </Label>
                                {region.subregions.map((area) => (
                                    <Item
                                        className="cursor-pointer select-none rounded-lg p-2 text-xl font-medium capitalize text-gray-900 outline-none hover:bg-violet-600/25 focus:bg-violet-600/25 data-[state=checked]:bg-violet-600/50 data-[state=checked]:text-violet-600"
                                        key={area.value}
                                        value={area.value}
                                    >
                                        <ItemText className="">
                                            {area.name}
                                        </ItemText>
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
