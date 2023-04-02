export interface REGIONS {
    euw: 'EUROPE'
    eune: 'EUROPE'
    russia: 'EUROPE'
    turkey: 'EUROPE'
    na: 'AMERICAS'
    las: 'AMERICAS'
    lan: 'AMERICAS'
    brazil: 'AMERICAS'
    korea: 'ASIA'
    japan: 'ASIA'
    oce: 'SEA'
}

export interface PLATFORMS {
    euw: 'EU_WEST'
    eune: 'EU_EAST'
    russia: 'RUSSIA'
    turkey: 'TURKEY'
    na: 'AMERICA_NORTH'
    las: 'LAT_SOUTH'
    lan: 'LAT_NORTH'
    brazil: 'BRAZIL'
    korea: 'KOREA'
    japan: 'JAPAN'
    oce: 'OCEANIA'
    pbe: 'PBE'
}

export interface QUEUE {
    map: string
    name: string
    description: string
}

export interface QUEUES {
    [key: number]: QUEUE
}

export interface LVL {
    total: number
    toReach: number
}

export interface LVLXP {
    [key: number]: LVL
}

export const REGIONS: REGIONS = {
    euw: 'EUROPE',
    eune: 'EUROPE',
    russia: 'EUROPE',
    turkey: 'EUROPE',
    na: 'AMERICAS',
    las: 'AMERICAS',
    lan: 'AMERICAS',
    brazil: 'AMERICAS',
    korea: 'ASIA',
    japan: 'ASIA',
    oce: 'SEA'
}

export const PLATFORMS: PLATFORMS = {
    euw: 'EU_WEST',
    eune: 'EU_EAST',
    russia: 'RUSSIA',
    turkey: 'TURKEY',
    na: 'AMERICA_NORTH',
    las: 'LAT_SOUTH',
    lan: 'LAT_NORTH',
    brazil: 'BRAZIL',
    korea: 'KOREA',
    japan: 'JAPAN',
    oce: 'OCEANIA',
    pbe: 'PBE'
}

export const QUEUES: QUEUES = {
    0: {
        map: 'Custom games',
        name: 'Custom game',
        description: ''
    },
    400: {
        map: "Summoner's Rift",
        name: 'Normal',
        description: '5v5 Draft Pick games'
    },
    420: {
        map: "Summoner's Rift",
        name: 'Ranked Solo',
        description: '5v5 Ranked Solo games'
    },
    430: {
        map: "Summoner's Rift",
        name: 'Blind Pick',
        description: '5v5 Blind Pick games'
    },
    440: {
        map: "Summoner's Rift",
        name: 'Ranked Flex',
        description: '5v5 Ranked Flex games'
    },
    700: {
        map: "Summoner's Rift",
        name: 'Clash',
        description: "Summoner's Rift Clash games"
    },
    830: {
        map: "Summoner's Rift",
        name: 'Co-op vs. AI Intro',
        description: 'Co-op vs. AI Intro Bot games'
    },
    840: {
        map: "Summoner's Rift",
        name: 'Co-op vs. AI Beginner',
        description: 'Co-op vs. AI Beginner Bot games'
    },
    850: {
        map: "Summoner's Rift",
        name: 'Co-op vs. AI Intermediate',
        description: 'Co-op vs. AI Intermediate Bot games'
    },
    900: {
        map: "Summoner's Rift",
        name: 'ARURF',
        description: 'ARURF games'
    },
    1020: {
        map: "Summoner's Rift",
        name: 'One for All',
        description: 'One for All games'
    },
    1300: {
        map: 'Nexus Blitz',
        name: 'Nexus Blitz',
        description: 'Nexus Blitz games'
    },
    1400: {
        map: "Summoner's Rift",
        name: 'Ultimate Spellbook',
        description: 'Ultimate Spellbook games'
    },
    1900: {
        map: "Summoner's Rift",
        name: 'URF',
        description: 'Pick URF games'
    }
}

export const LVLXP: LVLXP = {
    1: {
        total: 0,
        toReach: 0
    },
    2: {
        total: 280,
        toReach: 280
    },
    3: {
        total: 660,
        toReach: 380
    },
    4: {
        total: 1140,
        toReach: 480
    },
    5: {
        total: 1720,
        toReach: 580
    },
    6: {
        total: 2400,
        toReach: 680
    },
    7: {
        total: 3180,
        toReach: 780
    },
    8: {
        total: 4060,
        toReach: 880
    },
    9: {
        total: 5040,
        toReach: 980
    },
    10: {
        total: 6120,
        toReach: 1080
    },
    11: {
        total: 7300,
        toReach: 1180
    },
    12: {
        total: 8580,
        toReach: 1280
    },
    13: {
        total: 9960,
        toReach: 1380
    },
    14: {
        total: 11440,
        toReach: 1480
    },
    15: {
        total: 13020,
        toReach: 1580
    },
    16: {
        total: 14700,
        toReach: 1680
    },
    17: {
        total: 16480,
        toReach: 1780
    },
    18: {
        total: 18360,
        toReach: 1880
    }
}
