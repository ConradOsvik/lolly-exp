'use client'

import { MatchData } from '@prisma/client'
import { DBMatchData, DBMatchesResponse, ResponseType } from '@/types/common'
import MatchHistoryCard from './MatchHistoryCard'

export default function MatchHistory({
    history
}: {
    history: DBMatchData[] | []
}) {
    return (
        <div className="m-4 flex min-w-[600px] flex-col items-center justify-start rounded-lg bg-white p-4 shadow-lg">
            <div></div>
            <div>
                {history.map((match, i) => (
                    <MatchHistoryCard match={match} key={match.matchId} />
                ))}
            </div>
        </div>
    )
}
