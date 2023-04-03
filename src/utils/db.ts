import { Constants } from 'twisted'
import prisma from './prisma'
import api from './twisted'
import { PlatformType } from '@/types/common'
import { PLATFORMS, REGIONS } from './common'
import { Prisma } from '@prisma/client'

export async function getMatchesFromDB(
    summonerName: string,
    platform: PlatformType,
    skip: number = 0,
    take: number = 20
) {
    try {
        const matchlist = await prisma.matchData.findMany({
            where: {
                platform: platform,
                matchParticipantData: {
                    some: {
                        summonerName: summonerName
                    }
                }
            },
            include: {
                matchParticipantData: true
            },
            orderBy: {
                matchId: 'desc'
            },
            skip,
            take
        })

        if (matchlist.length === 0)
            throw { status: 404, msg: 'no matches found' }

        return {
            status: 200,
            data: matchlist
        }
    } catch (err: any) {
        return {
            status: Number(err.status) || 500,
            msg: String(err.message) || 'something went wrong on our end'
        }
    }
}

export async function updateMatchesInDB(
    summonerName: string,
    platform: PlatformType,
    skip: number = 0,
    take: number = 20
) {
    try {
        const {
            response: { puuid }
        } = await api.Summoner.getByName(
            summonerName,
            Constants.Regions[PLATFORMS[platform]]
        )

        const { response: matchIdList } = await api.MatchV5.list(
            puuid,
            Constants.RegionGroups[REGIONS[platform]],
            { count: take, start: skip }
        )

        const missingMatchIdListPromise = matchIdList.map(async (matchId) => {
            try {
                await prisma.matchData.findUniqueOrThrow({
                    where: {
                        matchId
                    }
                })
            } catch (err) {
                return matchId
            }
        })

        const missingMatchIdList = (
            await Promise.all(missingMatchIdListPromise)
        ).filter((matchId): matchId is string => !!matchId)

        const missingMatchDataListPromise = missingMatchIdList.map(
            async (matchId) => {
                const { response: matchData } = await api.MatchV5.get(
                    matchId,
                    Constants.RegionGroups[REGIONS[platform]]
                )

                return matchData
            }
        )

        const missingMatchDataList = await Promise.all(
            missingMatchDataListPromise
        )

        const dbMatchDataList: Prisma.MatchDataCreateManyInput[] =
            missingMatchDataList.map((matchData) => {
                return {
                    matchId: matchData.metadata.matchId,
                    gameCreation: new Date(matchData.info.gameCreation),
                    gameDuration: matchData.info.gameDuration,
                    //@ts-ignore
                    gameEndTimestamp: new Date(matchData.info.gameEndTimestamp),
                    gameId: String(matchData.info.gameId),
                    gameMode: matchData.info.gameMode,
                    gameStartTimestamp: new Date(
                        matchData.info.gameStartTimestamp
                    ),
                    gameType: matchData.info.gameType,
                    gameVersion: matchData.info.gameVersion
                        .split('.')
                        .slice(0, 2)
                        .join('.'),
                    mapId: matchData.info.mapId,
                    platform: platform,
                    platformId: matchData.info.platformId,
                    queueId: matchData.info.queueId,
                    blueBaronKills:
                        matchData.info.teams[0].objectives.baron.kills,
                    blueChampionKills:
                        matchData.info.teams[0].objectives.champion.kills,
                    blueDragonKills:
                        matchData.info.teams[0].objectives.dragon.kills,
                    blueInhibitorKills:
                        matchData.info.teams[0].objectives.inhibitor.kills,
                    blueRiftHeraldKills:
                        matchData.info.teams[0].objectives.riftHerald.kills,
                    blueTowerKills:
                        matchData.info.teams[0].objectives.tower.kills,
                    redBaronKills:
                        matchData.info.teams[1].objectives.baron.kills,
                    redChampionKills:
                        matchData.info.teams[1].objectives.champion.kills,
                    redDragonKills:
                        matchData.info.teams[1].objectives.dragon.kills,
                    redInhibitorKills:
                        matchData.info.teams[1].objectives.inhibitor.kills,
                    redRiftHeraldKills:
                        matchData.info.teams[1].objectives.riftHerald.kills,
                    redTowerKills:
                        matchData.info.teams[1].objectives.tower.kills,
                    blueFirstBaronKill:
                        matchData.info.teams[0].objectives.baron.first,
                    blueFirstChampionKill:
                        matchData.info.teams[0].objectives.champion.first,
                    blueFirstDragonKill:
                        matchData.info.teams[0].objectives.dragon.first,
                    blueFirstInhibitorKill:
                        matchData.info.teams[0].objectives.inhibitor.first,
                    blueFirstRiftHeraldKill:
                        matchData.info.teams[0].objectives.riftHerald.first,
                    blueFirstTowerKill:
                        matchData.info.teams[0].objectives.tower.first,
                    blueWon: matchData.info.teams[0].win
                }
            })

        const dbMatchParticipantDataList: Prisma.MatchParticipantDataCreateManyInput[] =
            missingMatchDataList
                .map((matchData) => {
                    return matchData.info.participants.map((participant) => {
                        return {
                            matchId: matchData.metadata.matchId,
                            assists: participant.assists,
                            baronKills: participant.baronKills,
                            champExperience: participant.champExperience,
                            champLevel: participant.champLevel,
                            championId: participant.championId,
                            championName: participant.championName,
                            controlWardsPlaced: participant.detectorWardsPlaced,
                            damageDealtToBuildings:
                                participant.damageDealtToBuildings,
                            damageDealtToObjectives:
                                participant.damageDealtToObjectives,
                            damageDealtToTurrets:
                                participant.damageDealtToTurrets,
                            damageSelfMitigated:
                                participant.damageSelfMitigated,
                            deaths: participant.deaths,
                            doubleKills: participant.doubleKills,
                            dragonKills: participant.dragonKills,
                            firstBloodAssist: participant.firstBloodAssist,
                            firstBloodKill: participant.firstBloodKill,
                            firstTowerAssist: participant.firstTowerAssist,
                            firstTowerKill: participant.firstTowerKill,
                            gameEndedInEarlySurrender:
                                participant.gameEndedInEarlySurrender,
                            gameEndedInSurrender:
                                participant.gameEndedInSurrender,
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
                            largestKillingSpree:
                                participant.largestKillingSpree,
                            largestMultiKill: participant.largestMultiKill,
                            longestTimeSpentLiving:
                                participant.longestTimeSpentLiving,
                            magicDamageDealt: participant.magicDamageDealt,
                            magicDamageDealtToChampions:
                                participant.magicDamageDealtToChampions,
                            magicDamageTaken: participant.magicDamageTaken,
                            neutralMinionsKilled:
                                participant.neutralMinionsKilled,
                            objectivesStolen: participant.objectivesStolen,
                            objectivesStolenAssists:
                                participant.objectivesStolenAssists,
                            participantId: participant.participantId,
                            pentaKills: participant.pentaKills,
                            perkDefense: participant.perks.statPerks.defense,
                            perkFlex: participant.perks.statPerks.flex,
                            perkOffense: participant.perks.statPerks.offense,
                            perkPrimaryStyle: participant.perks.styles[0].style,
                            perkPrimary1:
                                participant.perks.styles[0].selections[0].perk,
                            perkPrimary2:
                                participant.perks.styles[0].selections[1].perk,
                            perkPrimary3:
                                participant.perks.styles[0].selections[2].perk,
                            perkPrimary4:
                                participant.perks.styles[0].selections[3].perk,
                            perkSecondaryStyle:
                                participant.perks.styles[1].style,
                            perkSecondary1:
                                participant.perks.styles[1].selections[0].perk,
                            perkSecondary2:
                                participant.perks.styles[1].selections[1].perk,
                            physicalDamageDealt:
                                participant.physicalDamageDealt,
                            physicalDamageDealtToChampions:
                                participant.physicalDamageDealtToChampions,
                            physicalDamageTaken:
                                participant.physicalDamageTaken,
                            puuid: participant.puuid,
                            quadraKills: participant.quadraKills,
                            role: participant.role,
                            sightWardsBoughtInGame:
                                participant.sightWardsBoughtInGame,
                            spell1Casts: participant.spell1Casts,
                            spell2Casts: participant.spell2Casts,
                            spell3Casts: participant.spell3Casts,
                            spell4Casts: participant.spell4Casts,
                            summoner1Casts: participant.summoner1Casts,
                            summoner1Id: participant.summoner1Id,
                            summoner2Casts: participant.summoner2Casts,
                            summoner2Id: participant.summoner2Id,
                            summonerName: participant.summonerName,
                            teamId: participant.teamId,
                            teamPosition: participant.teamPosition,
                            timeCCingOthers: participant.timeCCingOthers,
                            timePlayed: participant.timePlayed,
                            totalDamageDealt: participant.totalDamageDealt,
                            totalDamageDealtToChampions:
                                participant.totalDamageDealtToChampions,
                            totalDamageTaken: participant.totalDamageTaken,
                            totalHeal: participant.totalHeal,
                            totalHealsOnTeammates:
                                participant.totalHealsOnTeammates,
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
                            visionWardsBoughtInGame:
                                participant.visionWardsBoughtInGame,
                            wardsKilled: participant.wardsKilled,
                            wardsPlaced: participant.wardsPlaced,
                            win: participant.win
                        }
                    })
                })
                .flat()

        try {
            await prisma.matchData.createMany({
                data: dbMatchDataList
            })

            await prisma.matchParticipantData.createMany({
                data: dbMatchParticipantDataList
            })
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2002') {
                    try {
                        await prisma.matchData.updateMany({
                            data: dbMatchDataList
                        })

                        await prisma.matchParticipantData.updateMany({
                            data: dbMatchParticipantDataList
                        })
                    } catch (err: any) {
                        return {
                            status: Number(err.status) || 500,
                            msg:
                                String(err.message) ||
                                'something went wrong on our end'
                        }
                    }
                }
            }
        }

        return {
            status: 200,
            msg: 'success'
        }
    } catch (err: any) {
        return {
            status: Number(err.status) || 500,
            msg: String(err.message) || 'something went wrong on our end'
        }
    }
}

export async function getSummonerFromDB(
    summonerName: string,
    platform: PlatformType
) {
    try {
        const summoner = await prisma.summonerProfile.findUniqueOrThrow({
            where: {
                summonerName_platform: { summonerName, platform }
            }
        })

        if (!summoner) {
            throw { status: 404, msg: 'no matches found' }
        }

        return {
            status: 200,
            data: summoner
        }
    } catch (err: any) {
        return {
            status: Number(err.status) || 500,
            msg: String(err.message) || 'something went wrong on our end'
        }
    }
}

export async function updateSummonerInDB(
    summonerName: string,
    platform: PlatformType
) {
    try {
        const { response: summonerData } = await api.Summoner.getByName(
            summonerName,
            Constants.Regions[PLATFORMS[platform]]
        )

        const { response: summonerRankedData } = await api.League.bySummoner(
            summonerData.id,
            Constants.Regions[PLATFORMS[platform]]
        )

        let rankedSoloData = {}

        let rankedFlexData = {}

        summonerRankedData.forEach((league) => {
            if (league.queueType === 'RANKED_SOLO_5x5') {
                rankedSoloData = {
                    soloLeagueId: league.leagueId,
                    soloTier: league.tier,
                    soloRank: league.rank,
                    soloLp: league.leaguePoints,
                    soloWins: league.wins,
                    soloLosses: league.losses,
                    soloVeteran: league.veteran,
                    soloInactive: league.inactive,
                    soloFreshBlood: league.freshBlood,
                    soloHotStreak: league.hotStreak
                }

                if (league.miniSeries) {
                    rankedSoloData = {
                        ...rankedSoloData,
                        soloPromosTarget: league.miniSeries.target,
                        soloPromosWins: league.miniSeries.wins,
                        soloPromosLosses: league.miniSeries.losses,
                        soloPromosProgress: league.miniSeries.progress
                    }
                }
            }

            if (league.queueType === 'RANKED_FLEX_SR') {
                rankedFlexData = {
                    flexLeagueId: league.leagueId,
                    flexTier: league.tier,
                    flexRank: league.rank,
                    flexLp: league.leaguePoints,
                    flexWins: league.wins,
                    flexLosses: league.losses,
                    flexVeteran: league.veteran,
                    flexInactive: league.inactive,
                    flexFreshBlood: league.freshBlood,
                    flexHotStreak: league.hotStreak
                }

                if (league.miniSeries) {
                    rankedFlexData = {
                        ...rankedFlexData,
                        flexPromosTarget: league.miniSeries.target,
                        flexPromosWins: league.miniSeries.wins,
                        flexPromosLosses: league.miniSeries.losses,
                        flexPromosProgress: league.miniSeries.progress
                    }
                }
            }
        })

        const summoner = await prisma.summonerProfile.findUnique({
            where: {
                summonerName_platform: { summonerName, platform }
            }
        })

        if (!summoner) {
            await prisma.summonerProfile.create({
                data: {
                    platform: platform,
                    summonerName: summonerData.name,
                    summonerLevel: summonerData.summonerLevel,
                    profileIconId: summonerData.profileIconId,
                    summonerId: summonerData.id,
                    accountId: summonerData.accountId,
                    puuid: summonerData.puuid,
                    ...rankedSoloData,
                    ...rankedFlexData
                }
            })
        }

        if (summoner)
            await prisma.summonerProfile.update({
                where: {
                    summonerName_platform: { summonerName, platform }
                },
                data: {
                    platform: platform,
                    summonerName: summonerData.name,
                    summonerLevel: summonerData.summonerLevel,
                    profileIconId: summonerData.profileIconId,
                    summonerId: summonerData.id,
                    accountId: summonerData.accountId,
                    puuid: summonerData.puuid,
                    ...rankedSoloData,
                    ...rankedFlexData
                }
            })

        return {
            status: 200,
            msg: 'success'
        }
    } catch (err: any) {
        return {
            status: Number(err.status) || 500,
            msg: String(err.message) || 'something went wrong on our end'
        }
    }
}
