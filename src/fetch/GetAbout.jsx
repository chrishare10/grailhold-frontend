import gql from 'graphql-tag'
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'


const GET_ABOUT = gql`
    query GET_ABOUT{
        globalSet(handle: "about") {
            ...on about_GlobalSet {
            text01
            textArea01
            }
        }
    }
`

const endpoint = import.meta.env.VITE_API_ENDPOINT
const headers = {
    authorization: import.meta.env.VITE_API_AUTH,
}

export default function GetAbout() {

  
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['about'],
        queryFn: async () =>
          request({
            url: endpoint,
            document: GET_ABOUT,
            requestHeaders: headers,
        })
    })
    if (isLoading) {
    return "loading about"
    }
    if (isError) {
    return "error: " + error
    }
    
    return data.globalSet
}

