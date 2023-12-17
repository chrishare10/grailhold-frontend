import { useState } from "react"
import GetCharacterAdjustmentStats from "../fetch/GetCharacterAdjustmentStats"
import gql from "graphql-tag"
import { useMutation } from '@tanstack/react-query'
import request from 'graphql-request'
import toast from 'react-hot-toast';

const ADJUST_STATS = gql`

    mutation (
        $id: ID,
        $title: String,
        $stress: Number,
        $text01: String,
        $text02: String,
        $text03: String,
        $text04: String,
        $text05: String
    ) {
        save_characters_default_Entry (
            id: $id,
            title: $title,
            stress: $stress,
          	text01: $text01,
            text02: $text02,
            text03: $text03,
            text04: $text04,
            text05: $text05
          ){
          title
            ...on characters_default_Entry {
                stress
                text01
                text02
                text03
                text04
                text05
            }
        }
    }
`


const endpoint = import.meta.env.VITE_API_ENDPOINT
const headers = {
    authorization: import.meta.env.VITE_API_AUTH,
}

export default function CharacterAdjustmentStatsContainer() {
    const [reduceStatState, setReduceStatState] = useState(0)
   
    

    let mutation = useMutation({
        mutationFn: async (variables) =>
          request({
            url: endpoint,
            document: ADJUST_STATS,
            requestHeaders: headers,
            variables,
        }),
        onError: (error) => {
          toast.error(`Could not update weekly stats`, {position: 'top-center',})
        },
        onSuccess: () => {
          toast.success(`Weekly stats updated`, {position: 'top-center',})
        }
      })

    let currentAdjustmentStats = GetCharacterAdjustmentStats(reduceStatState)
    let newAdjustmentStats = {entries: []}
    
    
    const handleStatClick = () => {
        if(currentAdjustmentStats){
            for (let i = 0; i < currentAdjustmentStats.entries.length; i++) {
                const element = currentAdjustmentStats.entries[i];
                let newObject = {
                    title: element.title,
                    id: element.id,
                    text01: null,
                    text02: null,
                    text03: null,
                    text04: null,
                    text05: null
                }
                
                // check if any stress is present. If so, reduce it by two and add to newObject.
                let newStress = 0
                if(element.stress === 1){
                    newStress = 0
                } else if(element.stress >= 2) {
                    newStress = element.stress - 2
                }
                newObject.stress = newStress
    
                // check if there are any harms. If so, remove first level harms and cascade other harms
                if(element.text01 || element.text02 || element.text03 || element.text04 || element.text05){
    
                    // adjust first level harms
                    if(element.text01 && element.text02){
                        newObject.text01 = element.text02
                        newObject.text02 = null
                    } else if(element.text01) {
                        newObject.text01 = null
                    } else if(element.text02){
                        newObject.text02 = null
                    }
    
                    // adjust second level harms
                    if(element.text03 && element.text04){
                        newObject.text02 = element.text03 + "(2)"
                        newObject.text03 = element.text04
                        newObject.text04 = null
                    } else if(element.text03){
                        newObject.text02 = element.text03 + "(2)"
                    } else if(element.text04) {
                        newObject.text02 = element.text04 + "(2)"
                    }
    
                    // adjust third level harms
                    if(element.text05){
                        newObject.text04 = element.text05 + "(3)"
                    }
    
                }
    
                
                console.log(newObject)
                mutation.mutate(newObject)
            }
        }
        
        setReduceStatState(reduceStatState + 1)
    }

    return <div>
        <div className="flex flex-col gap-3">
            <button id="adjust-stats-btn" onClick={handleStatClick} className="bg-gColorOne text-white py-2 px-3">
                Reduce Weekly Stats
            </button>
        </div>
    </div>
}