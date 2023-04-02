import { LolApi } from 'twisted'
let api: LolApi

if (process.env.NODE_ENV === 'production') {
    api = new LolApi({
        key: process.env.RIOT_API_KEY,
        rateLimitRetryAttempts: 3
    })
} else {
    let globalWithLolApi = global as typeof globalThis & {
        api: LolApi
    }
    if (!globalWithLolApi.api) {
        globalWithLolApi.api = new LolApi({
            key: process.env.RIOT_API_KEY,
            rateLimitRetryAttempts: 3
        })
    }
    api = globalWithLolApi.api
}

export default api
