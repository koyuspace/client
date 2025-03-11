import { createAuthClient } from "better-auth/client"
import { genericOAuthClient } from "better-auth/client/plugins"
 
const authClient = createAuthClient({
    plugins: [
        genericOAuthClient()
    ],
    baseURL: "http://127.0.0.1:3000"
})

export default authClient;