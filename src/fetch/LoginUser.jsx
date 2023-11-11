
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request'
import gql from 'graphql-tag'
import toast from 'react-hot-toast';  

const GET_USER = gql`
    mutation Authenticate($email: String!, $password: String!) {
    authenticate(
      email: $email
      password: $password
    ) {
      jwt
      refreshToken
      user {
        id
        email
        name
        username
        ...on User {
          gameMasterSwitch
          grailsPicker {
            id
            title
          }
        }
      }
    }
  }
`

const endpoint = import.meta.env.VITE_API_ENDPOINT
const headers = {
    authorization: import.meta.env.VITE_API_AUTH,
}

export default function LoginUser(loginState) {

 
  const loginQuery = useQuery({
    queryKey: ['loginUser', loginState],
    queryFn: async () =>
      request({
        url: endpoint,
        document: GET_USER,
        requestHeaders: headers,
        variables: loginState,
    }),
    enabled: !!loginState
    })

    return loginQuery
}
