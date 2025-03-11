import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import Database from "better-sqlite3";
 
export const auth = betterAuth({
    database: new Database("./sqlite.db"),
    trustedOrigins: [
        "http://127.0.0.1:3000",
        "https://koyu.space"
    ],
    emailAndPassword: {
        enabled: false
    },
    plugins: [
        genericOAuth({config: [{
            providerId: "koyuspace",
            clientId: "https://koyu.space/client-metadata.json",
            clientSecret: "secret",
            authorizationUrl: "https://koyu.space/oauth/authorize",
            tokenUrl: "https://koyu.space/oauth/token",
            scopes: ["atproto"],
            redirectURI: "https://koyu.space/callback"
        }]})
    ]
})