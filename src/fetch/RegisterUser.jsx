
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request'
import gql from 'graphql-tag'
import toast from 'react-hot-toast';
import { useRegisterStore } from '../stores/MainStore';

const REGISTER_USER = gql`
    mutation Register($email: String!, $password: String!, $name: String!) {
    register(
      email: $email
      password: $password
      fullName: $name
    ) {
      jwt
      user {
        id
        name
        email
        username
      }
    }
  }
`

const endpoint = import.meta.env.VITE_API_ENDPOINT
const headers = {
    authorization: import.meta.env.VITE_API_AUTH,
}

export default function RegisterUser(loginState) {

  const updateRegisterState = useRegisterStore(state => state.updateRegisterState)


 
  const registerQuery = useQuery({ 
    queryKey: ['registerUser'],
    queryFn: async () =>
      request({
        url: endpoint,
        document: REGISTER_USER,
        requestHeaders: headers,
        variables: loginState,
    }),
    retry: 0,
    onError: (error) => {
      toast.error(`Could not register user`, {position: 'top-center',})
      updateRegisterState(false)
    },
    onSuccess: () => {
      toast.success(`Check for verification email`, {position: 'top-center',})
      updateRegisterState(false)
    },
    enabled: !!loginState
    })
   
    return registerQuery
}
