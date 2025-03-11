"use client";

import Logo from "@/components/ui/logo";
import LogoButton from "@/components/ui/logobutton";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import Link from "next/link";
import { Input } from "@/components/ui/input";
import authClient from "@/lib/api";

export default function Login() {
    return (
        <div>
            <Card className="lg:w-1/3 mx-auto mt-20">
                <CardHeader>
                    <CardTitle><Logo className="mx-auto" /></CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p>Sign in with your koyu.space account to get started</p>
                    <br />
                    {/*<Input type="text" placeholder="@handle.tld" id="handle" className="lg:w-1/2 mx-auto" required={true} />
                    <br />*/}
                    <LogoButton text="Sign in with koyu.space" id="login" onClick={async () => {
                        const response = await authClient.signIn.oauth2({
                            providerId: "koyuspace",
                            callbackURL: "/callback", // the path to redirect to after the user is authenticated
                        });
                        console.log(response);
                    }} />
                    <br /><br />
                    <p className="text-xs mt-2"><Link href="/register">Register</Link> | <Link href="/forgot">Forgot password?</Link></p>
                    <p><a href="https://web.koyu.space" className="text-xs mt-2">Looking for koyu&#39;s personal website?</a></p>
                </CardContent>
            </Card>
        </div>
    );
}