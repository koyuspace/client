import type { NextApiRequest, NextApiResponse } from 'next'

type ClientMetadataResponse = {
    client_id: string,
    client_name: string,
    client_uri: string,
    logo_uri: string,
    tos_uri: string,
    policy_uri: string,
    redirect_uris: string[],
    scope: string,
    grant_types: string[],
    response_types: string[],
    token_endpoint_auth_method: string,
    application_type: string,
    dpop_bound_access_tokens: boolean
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ClientMetadataResponse>
) {
    const host = req.headers.host || 'koyu.space';
    const protocol = req.headers['x-forwarded-proto'] || 'https';

    res.status(200).json({
        client_id: `${protocol}://${host}/api/client-metadata.json`,
        client_name: "koyu.space",
        client_uri: `${protocol}://${host}`,
        logo_uri: `${protocol}://${host}/pb-icon_rendered.png`,
        tos_uri: `${protocol}://${host}/tos`,
        policy_uri: `${protocol}://${host}/policy`,
        redirect_uris: [`${protocol}://${host}/callback`],
        scope: "atproto",
        grant_types: ["authorization_code", "refresh_token"],
        response_types: ["code"],
        token_endpoint_auth_method: "none",
        application_type: "web",
        dpop_bound_access_tokens: true
    });
}