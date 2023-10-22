import gql from "graphql-tag"
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

const GET_CURRENT_USER = gql`
    query Viewer {
        viewer {
            id
            email
            name
            username
            ...on User {
                gameMasterSwitch
                grailsPicker {
                    id
                    title
                }
            }
        }
    }

`

export default function GetCurrentUser(jwt) {

    const endpoint = import.meta.env.VITE_API_ENDPOINT
    const headers = {
        Authorization: `JWT ${jwt}`
    }

    const { isLoading, isError, isSuccess, data } = useQuery({
        queryKey: ['currentUser', jwt],
        queryFn: async () =>
          request({
            url: endpoint,
            document: GET_CURRENT_USER,
            requestHeaders: headers,
        }),
        enabled: !!jwt
    })

    if (isError) {
    return console.log("could not sign in")
    }

    return data
}