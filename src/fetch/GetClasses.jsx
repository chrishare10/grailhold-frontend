import gql from "graphql-tag"
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

const GET_CLASSES = gql`
    query($section: [String]) {
        entries (section: $section, level: 1){
            title
            id
            ...on classes_class_Entry {
            aiming
            athletics
            communication
            healing
            insight
            lore
            nature
            perception
            performance
            stealth   
            striking
            tinker
            }
        }
    }
`

const endpoint = import.meta.env.VITE_API_ENDPOINT
const headers = {
    authorization: import.meta.env.VITE_API_AUTH,
}
export default function GetClasses() {

 
    const { isLoading, isError, data } = useQuery({
      queryKey: ['getClasses'],
      queryFn: async () =>
        request({
          url: endpoint,
          document: GET_CLASSES,
          requestHeaders: headers,
          variables: {
            section: "classes"
          }
      })
      })

      if (isError) {
      console.log("could not find classes")
      }
      return data
  }
  