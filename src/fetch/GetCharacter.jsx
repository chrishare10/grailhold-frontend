import gql from "graphql-tag"
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

const GET_CHARACTER = gql`
    query($characterId: [QueryArgument]) {
        entries (id: $characterId){
            id
            title
            ...on characters_default_Entry {
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
                classPicker {
                    id
                    title
                }
                subclassPicker {
                    id
                    title
                    ...on classes_feat_Entry {
                        textArea01
                    }
                }
                stress
                mannerismPicker {
                    id
                    title
                }
                formerProfessionsPicker {
                    id
                    title
                }
                text01
                text02
                text03
                text04
                text05
                attributesLimit
                armorValue
                climbingToolValue
                demolitionToolValue
                disguiseValue
                documentsValue
                firstAidValue
                lightSourceValue
                loadValue
                meleeWeaponValue
                navigationalToolValue
                performanceToolValue
                rangedWeaponValue
                shieldValue
                tinkeringToolValue
                unusualWeaponValue
                variableEquipmentSlotOneDescription
                variableEquipmentSlotOneValue
                
            }
        }
    }
`

const endpoint = process.env.VITE_API_ENDPOINT
const headers = {
    authorization: process.env.VITE_API_AUTH,
}
export default function GetCharacter(characterId) {

 
    const { isLoading, isError, data } = useQuery({
      queryKey: ['getCharacter'],
      queryFn: async () =>
        request({
          url: endpoint,
          document: GET_CHARACTER,
          requestHeaders: headers,
          variables: {
            "characterId": characterId
        },
      }),
      enabled: !!characterId
      })
      if (isError) {
      console.log("could not find character")
      }
      return data
  }
  