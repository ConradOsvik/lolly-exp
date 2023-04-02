import Banner from '@/components/SummonerProfile/Banner'
import MatchHistory from '@/components/SummonerProfile/MatchHistory/MatchHistory'
import {
    DBMatchesResponse,
    DBSummonerResponse,
    PlatformType,
    ResponseType
} from '@/types/common'
import { MatchData, MatchParticipantData, SummonerData } from '@prisma/client'
import {
    getMatchesFromDB,
    getSummonerFromDB,
    updateMatchesInDB,
    updateSummonerInDB
} from '@/utils/db'
import Content from '@/components/SummonerProfile/Content'

async function getSummonerData(
    summonerName: string,
    platform: PlatformType
): Promise<DBSummonerResponse> {
    const summonerData = await getSummonerFromDB(summonerName, platform)

    if (summonerData.status === 200) return summonerData

    const updatedSummonerDB = await updateSummonerInDB(summonerName, platform)

    if (updatedSummonerDB.status === 200) {
        const updatedSummonerData = await getSummonerFromDB(
            summonerName,
            platform
        )

        return updatedSummonerData
    }

    return updatedSummonerDB
}

async function getMatchlistData(
    summonerName: string,
    platform: PlatformType
): Promise<DBMatchesResponse> {
    const matchlistData = await getMatchesFromDB(summonerName, platform)

    if (matchlistData.status === 200) return matchlistData

    const updatedMatchlistDB = await updateMatchesInDB(summonerName, platform)

    if (updatedMatchlistDB.status === 200) {
        const updatedMatchlistData = await getMatchesFromDB(
            summonerName,
            platform
        )

        return updatedMatchlistData
    }

    return updatedMatchlistDB
}

export async function generateMetadata({ params }: { params: any }) {
    return {
        title: `[${params.platform}] ${params.summoner}`,
        description: `Summoner stats for ${params.summoner}`
    }
}

export default async function SummonerProfile({ params }: { params: any }) {
    const summonerPromise = getSummonerData(params.summoner, params.platform)
    const matchListPromise = getMatchlistData(params.summoner, params.platform)

    const [summoner, matchList] = await Promise.all([
        summonerPromise,
        matchListPromise
    ])

    return (
        <>
            <Banner />
            <Content
                matchListJSON={JSON.stringify(matchList)}
                summonerJSON={JSON.stringify(summoner)}
            />
        </>
    )
}
