'use client'

import clsx from 'clsx'

export default function Input({
    placeholder,
    className
}: {
    placeholder?: string
    className?: string
}) {
    return (
        <input
            className={clsx([
                'inline-flex rounded-md border-none bg-gray-100 py-2 px-4 capitalize outline-none duration-300 placeholder:capitalize placeholder:text-gray-400 focus:shadow-focus-ring',
                className
            ])}
            placeholder={placeholder}
        />
    )
}
