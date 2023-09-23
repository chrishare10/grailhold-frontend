import gql from "graphql-tag"
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

const GET_ENTRIES = gql`
    query($entryIds: [QueryArgument]) {
        entries (id: $entryIds){
            id
            title
            authorId
            slug
           
        }
    }
`

const endpoint = import.meta.env.VITE_API_ENDPOINT
const headers = {
    authorization: import.meta.env.VITE_API_AUTH,
}
export default function GetEntries(entryIds) {
 
    const { isLoading, isError, data } = useQuery({
      queryKey: ['getEntries', entryIds],
      queryFn: async () =>
        request({
          url: endpoint,
          document: GET_ENTRIES,
          requestHeaders: headers,
          variables: {
            "entryIds": entryIds
        },
      }),
      enabled: !!entryIds
      })
      if (isError) {
      console.log("could not find entries")
      }
      return data
  }
  