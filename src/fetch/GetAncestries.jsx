import gql from "graphql-tag"
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

const GET_ANCESTRIES = gql`
    query($section: [String]) {
        entries (section: $section){
            title
            id
        }
    }
`

const endpoint = import.meta.env.VITE_API_ENDPOINT
const headers = {
    authorization: import.meta.env.VITE_API_AUTH,
}
export default function GetAncestries() {

 
    const { isLoading, isError, data } = useQuery({
      queryKey: ['getAncestries'],
      queryFn: async () =>
        request({
          url: endpoint,
          document: GET_ANCESTRIES,
          requestHeaders: headers,
          variables: {
            section: "ancestries"
          }
        }),
        refetchOnWindowFocus: false
      })

      if (isError) {
      console.log("could not find ancestries")
      }
      return data
  }
  