import { Prisma } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'
import { LolApi, Constants } from 'twisted'
import prisma from '@/utils/prisma'

type LollyRequestBody = NextRequest['body'] & {
    puuid: string
    region: 'euw'
}

interface LollyRequest extends NextRequest {
    body: LollyRequestBody
}

interface REGIONGROUPS {
    euw: 'EUROPE'
}

interface REGIONS {
    euw: 'EU_WEST'
}

const api = new LolApi({
    key: process.env.RIOT_API_KEY,
    rateLimitRetryAttempts: 3
})

const REGIONGROUPS: REGIONGROUPS = {
    euw: 'EUROPE'
}

const REGIONS: REGIONS = {
    euw: 'EU_WEST'
}

const TEST_VALUES: { puuid: string; regionGroup: 'EUROPE' } = {
    puuid: 'j36SDtjAmLNr1sHjOVvW-nwHalm6CFqE38f5AF1hXBWDNqbb-SZaJAE-9riwhMB3tX_Ve_mlQsJXQg',
    regionGroup: 'EUROPE'
}

export async function GET(req: LollyRequest) {
    if (!req.body)
        return NextResponse.json({
            success: false,
            message: 'Missing Body'
        })

    const { puuid, region } = req.body

    const { response: riotMatchList } = await api.MatchV5.list(
        puuid,
        Constants.RegionGroups[REGIONGROUPS[region]]
    )

    const matchPromiseList = riotMatchList.map(async (match) => {
        try {
            await prisma.matchData.findUniqueOrThrow({
                where: {
                    matchId: match
                }
            })
        } catch (err) {
            return match
        }
    })

    const matchList = await Promise.all(matchPromiseList)

    const matchDataPromiseList = matchList.map(async (match) => {
        if (!match) return
        const { response } = await api.MatchV5.get(
            match,
            Constants.RegionGroups[REGIONGROUPS[region]]
        )

        return response
    })

    const matchDataList = await Promise.all(matchDataPromiseList)

    let finalMatchDataList: Prisma.MatchDataCreateManyInput[] = [],
        finalMatchParticipantDataList: Prisma.MatchParticipantDataCreateManyInput[] =
            []

    matchDataList.forEach((matchData) => {
        if (!matchData) return
        finalMatchDataList.push({
            matchId: matchData.metadata.matchId,
            gameCreation: new Date(matchData.info.gameCreation),
            gameDuration: matchData.info.gameDuration,
            //@ts-ignore
            gameEndTimestamp: new Date(matchData.info.gameEndTimestamp),
            gameId: String(matchData.info.gameId),
            gameMode: matchData.info.gameMode,
            gameStartTimestamp: new Date(matchData.info.gameStartTimestamp),
            gameType: matchData.info.gameType,
            gameVersion: matchData.info.gameVersion,
            mapId: matchData.info.mapId,
            platformId: matchData.info.platformId,
            queueId: matchData.info.queueId
        })

        matchData.info.participants.forEach((participant) => {
            finalMatchParticipantDataList.push({
                matchId: matchData.metadata.matchId,
                assists: participant.assists,
                baronKills: participant.baronKills,
                champExperience: participant.champExperience,
                champLevel: participant.champLevel,
                championId: participant.championId,
                championName: participant.championName,
                controlWardsPlaced: participant.detectorWardsPlaced,
                damageDealtToBuildings: participant.damageDealtToBuildings,
                damageDealtToObjectives: participant.damageDealtToObjectives,
                damageDealtToTurrets: participant.damageDealtToTurrets,
                damageSelfMitigated: participant.damageSelfMitigated,
                deaths: participant.deaths,
                doubleKills: participant.doubleKills,
                dragonKills: participant.dragonKills,
                firstBloodAssist: participant.firstBloodAssist,
                firstBloodKill: participant.firstBloodKill,
                firstTowerAssist: participant.firstTowerAssist,
                firstTowerKill: participant.firstTowerKill,
                gameEndedInEarlySurrender:
                    participant.gameEndedInEarlySurrender,
                gameEndedInSurrender: participant.gameEndedInSurrender,
                goldEarned: participant.goldEarned,
                goldSpent: participant.goldSpent,
                induvidualPosition: participant.individualPosition,
                inhibitorKills: participant.inhibitorKills,
                inhibitorTakedowns: participant.inhibitorTakedowns,
                inhibitorsLost: participant.inhibitorsLost,
                item0: participant.item0,
                item1: participant.item1,
                item2: participant.item2,
                item3: participant.item3,
                item4: participant.item4,
                item5: participant.item5,
                item6: participant.item6,
                itemsPurchased: participant.itemsPurchased,
                killingSprees: participant.killingSprees,
                kills: participant.kills,
                lane: participant.lane,
                largestCriticalStrike: participant.largestCriticalStrike,
                largestKillingSpree: participant.largestKillingSpree,
                largestMultiKill: participant.largestMultiKill,
                longestTimeSpentLiving: participant.longestTimeSpentLiving,
                magicDamageDealt: participant.magicDamageDealt,
                magicDamageDealtToChampions:
                    participant.magicDamageDealtToChampions,
                magicDamageTaken: participant.magicDamageTaken,
                neutralMinionsKilled: participant.neutralMinionsKilled,
                nexusKills: participant.nexusKills,
                nexusLost: participant.nexusLost,
                nexusTakedowns: participant.nexusTakedowns,
                objectivesStolen: participant.objectivesStolen,
                objectivesStolenAssists: participant.objectivesStolenAssists,
                participantId: participant.participantId,
                pentaKills: participant.pentaKills,
                perkDefense: participant.perks.statPerks.defense,
                perkFlex: participant.perks.statPerks.flex,
                perkOffense: participant.perks.statPerks.offense,
                perkPrimaryStyle: participant.perks.styles[0].style,
                perkPrimary1: participant.perks.styles[0].selections[0].perk,
                perkPrimary2: participant.perks.styles[0].selections[1].perk,
                perkPrimary3: participant.perks.styles[0].selections[2].perk,
                perkPrimary4: participant.perks.styles[0].selections[3].perk,
                perkSecondaryStyle: participant.perks.styles[1].style,
                perkSecondary1: participant.perks.styles[1].selections[0].perk,
                perkSecondary2: participant.perks.styles[1].selections[1].perk,
                physicalDamageDealt: participant.physicalDamageDealt,
                physicalDamageDealtToChampions:
                    participant.physicalDamageDealtToChampions,
                physicalDamageTaken: participant.physicalDamageTaken,
                puuid: participant.puuid,
                quadraKills: participant.quadraKills,
                role: participant.role,
                sightWardsBoughtInGame: participant.sightWardsBoughtInGame,
                spell1Casts: participant.spell1Casts,
                spell2Casts: participant.spell2Casts,
                spell3Casts: participant.spell3Casts,
                spell4Casts: participant.spell4Casts,
                summoner1Casts: participant.summoner1Casts,
                summoner1Id: participant.summoner1Id,
                summoner2Casts: participant.summoner2Casts,
                summoner2Id: participant.summoner2Id,
                summonerName: participant.summonerName,
                teamEarlySurrendered: participant.teamEarlySurrendered,
                teamId: participant.teamId,
                teamPosition: participant.teamPosition,
                timeCCingOthers: participant.timeCCingOthers,
                timePlayed: participant.timePlayed,
                totalDamageDealt: participant.totalDamageDealt,
                totalDamageDealtToChampions:
                    participant.totalDamageDealtToChampions,
                totalDamageTaken: participant.totalDamageTaken,
                totalHeal: participant.totalHeal,
                totalHealsOnTeammates: participant.totalHealsOnTeammates,
                totalMinionsKilled: participant.totalMinionsKilled,
                totalTimeCCDealt: participant.totalTimeCCDealt,
                totalTimeSpentDead: participant.totalTimeSpentDead,
                totalUnitsHealed: participant.totalUnitsHealed,
                tripleKills: participant.tripleKills,
                trueDamageDealt: participant.trueDamageDealt,
                trueDamageDealtToChampions:
                    participant.trueDamageDealtToChampions,
                trueDamageTaken: participant.trueDamageTaken,
                turretKills: participant.turretKills,
                turretTakedowns: participant.turretTakedowns,
                turretsLost: participant.turretsLost,
                unrealKills: participant.unrealKills,
                visionScore: participant.visionScore,
                visionWardsBoughtInGame: participant.visionWardsBoughtInGame,
                wardsKilled: participant.wardsKilled,
                wardsPlaced: participant.wardsPlaced,
                win: participant.win
            })
        })
    })

    try {
        await prisma.matchData.createMany({
            data: finalMatchDataList
        })

        await prisma.matchParticipantData.createMany({
            data: finalMatchParticipantDataList
        })

        return NextResponse.json({
            success: true,
            message: 'matchlist data added to the db'
        })
    } catch (err: any) {
        console.log(err)
        return NextResponse.json({ error: err.message })
    }
}
