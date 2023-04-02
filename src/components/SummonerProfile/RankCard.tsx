import Image from 'next/image'

interface Stats {
    queue: string
    leagueId: string
    tier: string
    rank: string
    lp: number
    wins: number
    losses: number
    veteran: boolean
    inactive: boolean
    freshBlood: boolean
    hotStreak: boolean
    promosTarget?: number
    promosWins?: number
    promosLosses?: number
    promosProgress?: string
}

export default function RankCard({ stats }: { stats: Stats }) {
    return (
        <div className="flex flex-col items-center justify-start rounded-lg shadow-lg">
            <div className="w-full text-lg text-violet-900">{stats.queue}</div>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-center">
                    <div>
                        <Image
                            src={`/emblem-${stats.tier.toLowerCase()}`}
                            alt="ranked emblem"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-violet-900">{stats.tier}</span>
                        <span className="text-violet-900">{stats.rank}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div>
                        <span>{stats.wins}W</span>
                        <span>{stats.losses}L</span>
                    </div>
                    <div>
                        <span>
                            {(
                                (stats.wins / (stats.wins + stats.losses)) *
                                100
                            ).toFixed(1)}
                            % Winrate
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
