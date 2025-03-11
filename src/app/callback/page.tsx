"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { InfoCircle } from "@mynaui/icons-react";
import IconStyles from "@/lib/icon-styles";
import { Button } from "@/components/ui/button";

export default function Callback() {
    const [searchParamsJson, setSearchParamsJson] = useState("");
    useEffect(() => {
        setSearchParamsJson(JSON.stringify(window.location.search.replace("?", "").split("&").reduce((acc: { [key: string]: string }, cur) => {
            const [key, value] = cur.split("=");
            acc[key] = decodeURIComponent(value.replaceAll("+", " "));
            return acc;
        }
        , {}), null, 2));
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
        <Card className="lg:w-1/2 w-full mx-auto my-3">
            <CardHeader>
                <h1><InfoCircle {...IconStyles()} /> Callback</h1>
            </CardHeader>
            <CardContent>
                <pre>{searchParamsJson}</pre>
            </CardContent>
            <CardFooter>
                <Button onClick={(e) => {
                    window.navigator.clipboard.writeText(searchParamsJson);
                    const button = e.currentTarget;
                    button.textContent = "Copied!";
                    setTimeout(() => button.textContent = "Copy to Clipboard", 1500);
                }}>Copy to Clipboard</Button>
            </CardFooter>
        </Card>
    )
}