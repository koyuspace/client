"use client";

import Image from 'next/image';


import { useEffect, useState } from "react";

export default function Logo({ className }: React.ComponentProps<"img">) {
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        window.setInterval(() => {
            const className = 'dark';
            const bodyClass = window.document.body.classList;
            setIsDark(bodyClass.contains(className));
        }, 1000);
    }, []);
    return (
        <picture>
            <source media="(prefers-color-scheme: dark)" srcSet="/img/pb-icon.svg" />
            <source media="(prefers-color-scheme: light)" srcSet="/img/logo-full.svg" />
            <Image src={isDark ? "/img/pb-icon.svg" : "/img/logo-full.svg"} alt="Logo" width={300} height={300} className={className} />
        </picture>
    );
}