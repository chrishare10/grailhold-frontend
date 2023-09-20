import gql from "graphql-tag"
import request from 'graphql-request'
import { useMutation } from '@tanstack/react-query' 
import toast from 'react-hot-toast';

const endpoint = import.meta.env.VITE_API_ENDPOINT
const headers = {
    authorization: import.meta.env.VITE_API_AUTH,
}
export default function CreateEntry(input) {


    const CREATE_ENTRY = gql`
    mutation($title: String, $authorId: ID) {
        save_${input.type}_default_Entry(title:$title, authorId: $authorId) {
            authorId
            enabled
            title
        }
    }
`



console.log(input)

 
let mutation = useMutation({
    mutationFn: async (variables) =>
        request({
          url: endpoint,
          document: CREATE_ENTRY,
          requestHeaders: headers,
          variables
        }),
        onError: (error) => {
            toast.error(`Could not create entry`, {position: 'top-center',})
        },
        onSuccess: () => {
            toast.success(`Entry created`, {position: 'top-center',})
        }
    }) 
  }
  