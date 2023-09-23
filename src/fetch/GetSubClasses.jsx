import gql from "graphql-tag"
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

const GET_SUBCLASSES = gql`
    query($classId: Int) {
        entries (descendantOf: $classId, section: "classes"){
            title
            id
            ...on classes_feat_Entry{
                textArea01
            }
           
        
        }
    }
`

const endpoint = process.env.VITE_API_ENDPOINT
const headers = {
    authorization: process.env.VITE_API_AUTH,
}
export default function GetSubClasses(classId) {
    const { isLoading, isError, data } = useQuery({
      queryKey: ['getSubClasses', classId],
      queryFn: async () =>
        request({
          url: endpoint,
          document: GET_SUBCLASSES,
          requestHeaders: headers,
          variables: {
            "classId": classId
          },
          enabled: !!classId
      })
      })

      if (isError) {
      console.log("could not find subclasses")
      }
      return data
  }
  