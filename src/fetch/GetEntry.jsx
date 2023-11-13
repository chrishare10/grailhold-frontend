import gql from "graphql-tag"
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'
import { useHexStore } from "../stores/MainStore"

const GET_ENTRY = gql`
    query($entryId: [QueryArgument]) {
        entries (id: $entryId){
            id
            title
            authorId
            sectionId
            slug
            ...on fables_default_Entry {
                textArea01
                image01 {
                    filename
                }
                characterPicker {
                    id
                    title
                }

            }
            ...on fixtures_default_Entry {
                textArea01
                charactersPicker {
                    id
                    title
                }
                image01 {
                    url @transform (width: 750)
                    alt
                }
            }
            ...on fabrications_default_Entry {
                textArea01
                characterPicker {
                    id
                    title
                }
            }
        }
    }
`

const endpoint = import.meta.env.VITE_API_ENDPOINT
const headers = {
    authorization: import.meta.env.VITE_API_AUTH,
}
export default function GetEntry(entryId) {

    const reloadEntryState = useHexStore(state => state.reloadEntryState)
 
    const { isLoading, isError, data } = useQuery({
      queryKey: ['getEntry', entryId, reloadEntryState],
      queryFn: async () =>
        request({
          url: endpoint,
          document: GET_ENTRY,
          requestHeaders: headers,
          variables: {
            "entryId": entryId
        },
      }),
      enabled: !!entryId
      })
      if (isError) {
      console.log("could not find entry")
      }
      return data
  }
  