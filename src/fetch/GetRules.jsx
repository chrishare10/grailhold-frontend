import gql from 'graphql-tag'
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'


const GET_RULES = gql`
    query GET_RULES{
        entry (id: 159){
            ...on gameSystems_gameRules_Entry {
              textArea01
            }
        }
    }
`

const endpoint = process.env.VITE_API_ENDPOINT
const headers = {
    authorization: process.env.VITE_API_AUTH,
}

export default function GetRules() {

  
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['rules'],
        queryFn: async () =>
          request({
            url: endpoint,
            document: GET_RULES,
            requestHeaders: headers,
        })
    })
    if (isLoading) {
    return "loading rules"
    }
    if (isError) {
    return "error: " + error
    }
    
    return data.entry.textArea01
}

