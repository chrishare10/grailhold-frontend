import gql from "graphql-tag"
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

const GET_REFRESH_JWT = gql`
    mutation RefreshToken($refreshToken: String) {
        refreshToken(refreshToken: $refreshToken) {
            jwt
            jwtExpiresAt
            refreshToken
            refreshTokenExpiresAt
        }
    }

`

export default function GetRefresh({refreshToken, jwtToken}) {

    // console.log(refreshToken)

    const endpoint = import.meta.env.VITE_API_ENDPOINT
    const headers = {
        Authorization: `JWT ${jwtToken}`,
        authorization: import.meta.env.VITE_API_AUTH
    }

    const { isLoading, isError, isSuccess, data } = useQuery({
        queryKey: ['refreshJWT', refreshToken],
        queryFn: async () =>
          request({
            url: endpoint,
            document: GET_REFRESH_JWT,
            requestHeaders: headers,
            variables: {
                "refreshToken": refreshToken
            }
        }),
        enabled: !!refreshToken
    })

    if (isError) {
    return console.log("could not refresh JWT")
    }

    console.log(data)
}