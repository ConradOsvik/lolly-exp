import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { atomWithStorage } from 'jotai/utils'

export type regions =
    | undefined
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

let darkModeAtom: any = undefined

if (typeof window !== 'undefined') {
    darkModeAtom = atomWithStorage(
        'darkMode',
        window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
            ? true
            : false
    )
} else {
    atomWithStorage('darkMode', false)
}

export { darkModeAtom }

/*
export const darkModeAtom = atomWithStorage(
  "darkMode",
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? true
    : false
);
*/

export const regionAtom = atomWithStorage<undefined | string>(
    'region',
    undefined
)

export const summonerAtom = atomWithStorage<string>('summoner', '')

interface SearchState {
    summoner: string
    platform: regions
}

export const useSearchStore = create<SearchState>()(
    persist(
        (set, get) => ({
            summoner: '',
            platform: undefined
        }),
        {
            name: 'search-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
)
