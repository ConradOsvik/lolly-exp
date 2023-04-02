import { useSearchStore } from '@/store'
import { DBMatchData } from '@/types/common'
import { MatchParticipantData } from '@prisma/client'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

function ParticipantItem({
    participant,
    version,
    summoner
}: {
    participant: MatchParticipantData
    version: string
    summoner: string
}) {
    const platform = useSearchStore((state) => state.platform)

    return (
        <div className="m-px flex items-center justify-start">
            <div className="mr-1 h-[16px] w-[16px] overflow-hidden rounded-sm">
                <Image
                    src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/champion/${participant.championName}.png`}
                    alt={`${participant.championName} Splash Art`}
                    width={60}
                    height={60}
                    quality={100}
                    className="scale-[1.15]"
                />
            </div>
            <Link
                className={clsx(
                    summoner === participant.summonerName
                        ? 'text-gray-900'
                        : 'text-gray-500',
                    'hover:cursor-pointer, text-sm leading-none hover:underline'
                )}
                href={`/${platform}/${participant.summonerName}`}
            >
                {participant.summonerName.length > 10
                    ? participant.summonerName.substring(0, 10) + '...'
                    : participant.summonerName}
            </Link>
        </div>
    )
}

export default function ParticipantList({
    match,
    summoner
}: {
    match: DBMatchData
    summoner: string
}) {
    const participants = match.matchParticipantsData

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-start justify-center p-1">
                {participants.map(
                    (participant) =>
                        participant.teamId === 100 && (
                            <ParticipantItem
                                participant={participant}
                                version={match.gameVersion}
                                summoner={summoner}
                                key={participant.summonerName}
                            />
                        )
                )}
            </div>
            <div className="flex flex-col items-start justify-center p-1">
                {participants.map(
                    (participant) =>
                        participant.teamId === 200 && (
                            <ParticipantItem
                                participant={participant}
                                version={match.gameVersion}
                                summoner={summoner}
                                key={participant.summonerName}
                            />
                        )
                )}
            </div>
        </div>
    )
}
