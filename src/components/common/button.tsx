'use client'

import { ReactNode } from 'react'

export default function Button({ children }: { children: ReactNode }) {
    return (
        <button className="m-2 rounded-md bg-violet-500 py-3 px-4 font-semibold capitalize text-white outline-none duration-300 hover:bg-violet-700 focus-visible:shadow-focus-ring">
            {children}
        </button>
    )
}
