"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Logo from "@/components/ui/logo";
import { useEffect, useState } from "react";

export default function WIP() {
    const [seconds, setSeconds] = useState(5);
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds - 1);
            if (seconds === 1) {
                clearInterval(interval);
                window.location.href = "https://web.koyu.space";
            }
        }
        , 1000);
        return () => clearInterval(interval);
    }, [seconds]);
    return (
        <>
            <Card className="lg:w-1/3 w-full mx-auto my-3 text-center">
                <CardHeader>
                    <Logo className="mx-auto my-3" />
                    <br />
                    <h1 className="text-2xl font-bold">Coming soon</h1>
                </CardHeader>
                <CardContent>
                    <p>Something great will happen here very soon. Stay tuned!</p>
                    <br />
                    <p>You&apos;ll be redirected to koyu&apos;s personal website in {seconds}</p>
                </CardContent>
            </Card>
        </>
    )
}