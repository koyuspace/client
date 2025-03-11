"use client";

import { useEffect } from "react";

export default function Callback() {
    useEffect(() => {
        const searchParamsJSON = window.location.search.replace("?", "").split("&").reduce((acc: { [key: string]: string }, cur) => {
            const [key, value] = cur.split("=");
            acc[key] = decodeURIComponent(value.replaceAll("+", " "));
            return acc;
        }
        , {});
        if (searchParamsJSON.error) {
            window.location.href = "/error?type=oauth_error" + window.location.search.replace("?", "&");
        }
    }, []);
    return (
        <></>
    )
}