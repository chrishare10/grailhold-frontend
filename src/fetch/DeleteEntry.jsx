import gql from "graphql-tag"
import request from 'graphql-request'
import { useMutation } from '@tanstack/react-query' 
import toast from 'react-hot-toast';


const endpoint = import.meta.env.VITE_API_ENDPOINT
const headers = {
    authorization: import.meta.env.VITE_API_AUTH,
}
export default function DeleteEntry(entryId) {


    const DELETE_ENTRY = gql`
    mutation DeleteEntry($id: ID) {
        deleteEntry(id: $id)
    }

    `
 
let mutation = useMutation({
  mutationFn: async (entryId) =>
        request({
          url: endpoint,
          document: DELETE_ENTRY,
          requestHeaders: headers,
          variables: {
            "id": entryId
          }
      }),
      onError: (error) => {
          toast.error(`Could not delete entry`, {position: 'top-center',})
      },
      onSuccess: () => {
          toast.success(`Entry deleted`, {position: 'top-center',})
      }
    })
      
  }
  