import { createAuthClient } from "better-auth/client"
import { genericOAuthClient } from "better-auth/client/plugins"
 
const authClient = createAuthClient({
    plugins: [
        genericOAuthClient()
    ],
    baseURL: "https://koyu.space"
})

export default authClient;