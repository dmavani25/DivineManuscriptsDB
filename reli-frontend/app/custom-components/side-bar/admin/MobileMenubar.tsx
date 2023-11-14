// @/components/Layout/MenuBarMobile.js
import React from 'react'
import Link from 'next/link'


export default function MenuBarMobile({ setter } : {setter : Function}) {
    return (
        <nav className="md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] bg-black flex [&>*]:my-auto px-2">
            <button
                className="text-4xl flex text-white"
                onClick={() => {
                    setter((oldVal : boolean) => !oldVal);
                }}
            >
            </button>
            
            <Link
                className="text-3xl flex text-white"
                href="/login"
            >
            </Link>
        </nav>
    )
}