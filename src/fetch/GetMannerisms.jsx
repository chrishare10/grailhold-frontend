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

const endpoint = process.env.VITE_API_ENDPOINT
const headers = {
    authorization: process.env.VITE_API_AUTH,
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
      })
      })

      if (isError) {
      console.log("could not find mannerisms")
      }
      return data
  }
  