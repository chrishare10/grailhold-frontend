import gql from "graphql-tag"
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

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

const endpoint = process.env.VITE_API_ENDPOINT
const headers = {
    authorization: process.env.VITE_API_AUTH,
}
export default function GetEntry(entryId) {
 
    const { isLoading, isError, data } = useQuery({
      queryKey: ['getEntry', entryId],
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
  