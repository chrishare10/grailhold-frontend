import gql from "graphql-tag"
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

const GET_CHARACTERS = gql`
    query($userState: [QueryArgument]) {
        entries (relatedTo: $userState, section: "characters"){
            title
            id
        }
    }
`

const endpoint = import.meta.env.VITE_API_ENDPOINT
const headers = {
    authorization: import.meta.env.VITE_API_AUTH,
}
export default function GetCharacters(userState) {

    const { isLoading, isError, data } = useQuery({
      queryKey: ['getCharacters', userState.userId, userState.reloadState],
      queryFn: async () =>
        request({
          url: endpoint,
          document: GET_CHARACTERS,
          requestHeaders: headers,
          variables: {
            "userState": userState.userId
        },
      }),
      enabled: !!userState
      })

      if (isError) {
      console.log("could not find characters")
      }
      return data
  }
  