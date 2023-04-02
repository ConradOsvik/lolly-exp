import { MatchData, MatchParticipantData, SummonerData } from '@prisma/client'

export type PlatformType =
    | 'euw'
    | 'eune'
    | 'russia'
    | 'turkey'
    | 'na'
    | 'las'
    | 'lan'
    | 'brazil'
    | 'oce'
    | 'korea'
    | 'japan'

export interface SummonerDataType {
    accountId: string
    profileIconId: number
    revisionDate: number
    name: string
    id: string
    puuid: string
    summonerLevel: number
}

export interface ResponseType<T> {
    status: number
    message: string
    data: T
}

export interface DBMatchData extends MatchData {
    matchParticipantsData: MatchParticipantData[]
}

export interface DBMatchesResponse extends ResponseType<DBMatchData[] | []> {}

export interface DBSummonerResponse extends ResponseType<SummonerData | {}> {}
