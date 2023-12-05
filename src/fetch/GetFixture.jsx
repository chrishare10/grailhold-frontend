import gql from 'graphql-tag'
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'


const GET_FIXTURES = gql`
    query GET_FIXTURES{
        entries (section: "fixtures", limit: 3, orderBy:"RAND()", leaves: true){
            title
            id
        }
    }
`

const endpoint = import.meta.env.VITE_API_ENDPOINT
const headers = {
    authorization: import.meta.env.VITE_API_AUTH,
}

export default function GetFixture(state) {

  
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['fixture', state],
        queryFn: async () =>
          request({
            url: endpoint,
            document: GET_FIXTURES,
            requestHeaders: headers,
        }),
        enabled: !!state,
        refetchOnWindowFocus: false
    })
    if (isLoading) {
    return [{title: "No fixtures yet.", id: "loading"}]
    }
    if (isError) {
    return [{title: "error", id: "error"}]
    }
    
    return data.entries
}

