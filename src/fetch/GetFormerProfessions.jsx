import gql from "graphql-tag"
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

const GET_FORMER_PROFESSIONS = gql`
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
export default function GetFormerProfessions() {

 
    const { isLoading, isError, data } = useQuery({
      queryKey: ['getFormerProfessions'],
      queryFn: async () =>
        request({
          url: endpoint,
          document: GET_FORMER_PROFESSIONS,
          requestHeaders: headers,
          variables: {
            section: "formerProfessions"
            }
        }),
        refetchOnWindowFocus: false
      })

      if (isError) {
      console.log("could not find former professions")
      }
      return data
  }
  