import gql from 'graphql-tag'
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'


const GET_ENCOUNTERS = gql`
    query GET_ENCOUNTERS{
        entries (section: "encounters", limit: 3, orderBy:"RAND()", leaves: true){
            title
            id
        }
    }
`

const endpoint = import.meta.env.VITE_API_ENDPOINT
const headers = {
    authorization: import.meta.env.VITE_API_AUTH,
}

export default function GetEncounter(state) {

  
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['encounter', state],
        queryFn: async () =>
          request({
            url: endpoint,
            document: GET_ENCOUNTERS,
            requestHeaders: headers,
        }),
        enabled: !!state
    })
    if (isLoading) {
    return [{title: "No encounters yet.", id: "loading"}]
    }
    if (isError) {
    return [{title: "error", id: "error"}]
    }
    
    return data.entries

}