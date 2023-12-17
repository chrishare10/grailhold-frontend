import gql from "graphql-tag"
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

const GET_ADJUSTMENT_STATS = gql`
    query {
        entries (section: "characters"){
            title
            id
            ...on characters_default_Entry {
                stress
                text01
                text02
                text03
                text04
                text05
            }
        }
    }
`

const endpoint = import.meta.env.VITE_API_ENDPOINT
const headers = {
    authorization: import.meta.env.VITE_API_AUTH,
}
export default function GetCharacterAdjustmentStats(reduceStatState) {

    const { isLoading, isError, data } = useQuery({
      queryKey: ['getCharacterAdjustmentStat', reduceStatState],
      queryFn: async () =>
        request({
          url: endpoint,
          document: GET_ADJUSTMENT_STATS,
          requestHeaders: headers,
        }),
        enabled: !!reduceStatState,
        refetchOnWindowFocus: false
      })

      if (isError) {
      console.log("could not adjust character stats")
      }
      return data
  }
  