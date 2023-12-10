import gql from "graphql-tag"
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

const GET_MANNERISMS = gql`
    query($mannerisms: [String]) {
        entries (section: $mannerisms, level: 2){
            title
            id
        }
    }
`

const endpoint = import.meta.env.VITE_API_ENDPOINT
const headers = {
    authorization: import.meta.env.VITE_API_AUTH,
}
export default function GetMannerisms() {

 
    const { isLoading, isError, data } = useQuery({
      queryKey: ['getMannerisms'],
      queryFn: async () =>
        request({
          url: endpoint,
          document: GET_MANNERISMS,
          requestHeaders: headers,
          variables: {
            mannerisms: "mannerisms"
            }
        }),
        refetchOnWindowFocus: false
      })

      if (isError) {
      console.log("could not find mannerisms")
      }
      return data
  }
  