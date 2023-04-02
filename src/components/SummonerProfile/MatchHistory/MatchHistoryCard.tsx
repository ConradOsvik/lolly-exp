'use client'

import { useParams } from 'next/navigation'
import { DBMatchData } from '@/types/common'
import clsx from 'clsx'
import {
    addSeconds,
    format,
    formatDistanceStrict,
    formatDuration
} from 'date-fns'
import { LVLXP, QUEUES } from '@/utils/common'
import Image from 'next/image'
import ParticipantList from './ParticipantList'

export default function matchhistorycard({ match }: { match: DBMatchData }) {
    const { summoner } = useParams()

    const player = match.matchParticipantsData.find(
        (participant) => participant.summonerName === summoner
    )!
    const participants = match.matchParticipantsData.map(
        (participant) => participant
    )

    const gameOutcome =
        player.win && match.gameDuration > 180
            ? 'win'
            : !player.win && match.gameDuration > 180
            ? 'loss'
            : 'remake'
    const matchAge = formatDistanceStrict(
        new Date(match.gameEndTimestamp),
        new Date(Date.now()),
        { addSuffix: true, roundingMethod: 'round' }
    )
    const matchDuration = format(
        addSeconds(new Date(0), match.gameDuration),
        'mm:ss'
    )
    const xpBarProgress =
        player.champLevel === 18
            ? 320
            : ((LVLXP[player.champLevel + 1].total - player.champExperience) /
                  LVLXP[player.champLevel + 1].toReach) *
              320

    return (
        <div
            className={clsx(
                gameOutcome === 'win' && 'bg-blue-500/10',
                gameOutcome === 'loss' && 'bg-red-500/10',
                gameOutcome === 'remake' && 'bg-stone-500/10',
                'm-2 flex min-w-[500px] items-center justify-center rounded-xl p-2'
            )}
        >
            {/* <div className="items-left flex flex-col justify-center">
                <div className="items-left mb-1 flex flex-col justify-center">
                    <span className="text-sm font-semibold capitalize">
                        {QUEUES[match.queueId].name}
                    </span>
                    <span className="text-xs">{matchAge}</span>
                </div>
                <div>
                    <span
                        className={clsx(
                            gameOutcome === 'win' && 'text-blue-500',
                            gameOutcome === 'loss' && 'text-red-500',
                            gameOutcome === 'remake' && 'text-stone-500',
                            'mx-1 text-sm font-semibold uppercase'
                        )}
                    >
                        {gameOutcome}
                    </span>
                    <span className="mx-1 text-sm">{matchDuration}</span>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="relative">
                    <div
                        className="rotate-[155deg] rounded-full p-1"
                        style={{
                            background: `conic-gradient(#9333ea ${xpBarProgress}deg, transparent 0deg)`
                        }}
                    >
                        <div className="h-[50px] w-[50px] rotate-[-155deg] overflow-hidden rounded-full">
                            <Image
                                src={`http://ddragon.leagueoflegends.com/cdn/${match.gameVersion}.1/img/champion/${player.championName}.png`}
                                alt={`${player.championName} Splash Art`}
                                width={50}
                                height={50}
                                quality={100}
                                className="scale-[1.15]"
                            />
                        </div>
                    </div>
                    <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-white">
                        {player.champLevel}
                    </span>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center"></div>
            <div className="flex flex-col items-center justify-center"></div>
            <div className="flex flex-col items-center justify-center"></div> */}
            <ParticipantList match={match} summoner={summoner} />
        </div>
    )
}
