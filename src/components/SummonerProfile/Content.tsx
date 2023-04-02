'use client'

import {
    DBMatchesResponse,
    DBSummonerResponse,
    ResponseType
} from '@/types/common'
import MatchHistory from './MatchHistory/MatchHistory'
import RankCard from './RankCard'
import RecentlyPlayedCard from './RecentlyPlayedCard'
import RecentlyPlayedWithCard from './RecentlyPlayedWithCard'

export default function Content({
    matchListJSON,
    summonerJSON
}: {
    matchListJSON: string
    summonerJSON: string
}) {
    const matchList: DBMatchesResponse = JSON.parse(matchListJSON)
    const summoner: DBSummonerResponse = JSON.parse(summonerJSON)

    const history = matchList.data

    console.log(summoner)

    return (
        <div className="flex w-[80rem] items-start justify-center">
            <div className="flex flex-col items-center justify-start">
                <RankCard stats={} />
                <RankCard stats={} />
                <RecentlyPlayedCard />
                <RecentlyPlayedWithCard />
            </div>
            <MatchHistory history={history} />
        </div>
    )
}
