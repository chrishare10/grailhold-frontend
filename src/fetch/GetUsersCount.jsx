import gql from 'graphql-tag'
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'


const GET_USERS_COUNT = gql`
    query GET_USERS_COUNT{
        userCount
    }
`

const endpoint = import.meta.env.VITE_API_ENDPOINT
const headers = {
    authorization: import.meta.env.VITE_API_AUTH,
}

export default function GetUsersCount() {

  
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['users-count'],
        queryFn: async () =>
          request({
            url: endpoint,
            document: GET_USERS_COUNT,
            requestHeaders: headers,
        })
    })
    if (isLoading) {
    return "loading..."
    }
    if (isError) {
    return "error: " + error
    }
    
    return data.userCount
}

