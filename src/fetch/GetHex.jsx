import gql from "graphql-tag"
import request from 'graphql-request'
import { useQueries } from '@tanstack/react-query'
import { useHexStore } from "../stores/MainStore"

const GET_HEX = gql`
    query ($entryId: [QueryArgument]){
        entries (id: $entryId){
            title
            id
            ...on hexes_default_Entry {
                hexId
                textArea01
            }
        }
    }
`
const GET_RELATED_FIXTURES = gql`
    query ($entryId: [QueryArgument]){
        entries (section: "fixtures", relatedTo:$entryId ){
            title
            id
            slug
            ...on fixtures_default_Entry {
                landmarkBoolean
                textArea01
            }
        }
    }
`

const GET_RELATED_FABRICATIONS = gql`
    query ($entryId: [QueryArgument]){
        entries (section: "fabrications", relatedTo:$entryId ){
            title
            id
            slug
            authorId
            ...on fabrications_default_Entry {
                approvedEntry
                characterPicker {
                    id
                    title
                }
            }
        }
    }
`

const GET_RELATED_FABLES = gql`
    query ($entryId: [QueryArgument]){
        entries (section: "fables", relatedTo:$entryId ){
            title
            id
            slug
            authorId
            ...on fables_default_Entry {
                approvedEntry
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


export default function GetHex(hex) {

    const reloadHexState = useHexStore(state => state.reloadHexState)

    const hexQuery = useQueries({
        queries: [
            {
                queryKey: ['hex', hex.entry, reloadHexState],
                queryFn: async () =>
                    request({
                        url: endpoint,
                        document: GET_HEX,
                        requestHeaders: headers,
                        variables: {
                            "entryId": hex.entry
                        },
                        
                    }),
                enabled: !!hex.entry
            },
            {
                queryKey: ['related-fixtures', hex.entry, reloadHexState],
                queryFn: async () =>
                    request({
                        url: endpoint,
                        document: GET_RELATED_FIXTURES,
                        requestHeaders: headers,
                        variables: {
                            "entryId": hex.entry
                        },
                        
                    }),
                enabled: !!hex.entry
            },
            {
                queryKey: ['related-fabrications', hex.entry, reloadHexState],
                queryFn: async () =>
                    request({
                        url: endpoint,
                        document: GET_RELATED_FABRICATIONS,
                        requestHeaders: headers,
                        variables: {
                            "entryId": hex.entry
                        },
                        
                    }),
                enabled: !!hex.entry
            },
            {
                queryKey: ['related-fables', hex.entry, reloadHexState],
                queryFn: async () =>
                    request({
                        url: endpoint,
                        document: GET_RELATED_FABLES,
                        requestHeaders: headers,
                        variables: {
                            "entryId": hex.entry
                        },
                        
                    }),
                enabled: !!hex.entry
            }
        ]
        
    })

    if(hexQuery.isError) {
        return hexQuery.error
    }
    
    

    return (hexQuery)
}