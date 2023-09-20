import { useRef } from 'react'
import GetHexes from '../fetch/GetHexes'
import { useHexStore, useProfileStore, useNavStore, useRulesStore } from "../stores/MainStore"

let selectedHex
export default function BuildHexes() {
    const updateHex = useHexStore(state => state.updateHex)
    const oldHex = useHexStore(state => state.oldHex)
    const updateDetailsState = useHexStore(state => state.updateDetailsState)
    const updateDetailsPage = useHexStore(state => state.updateDetailsPage)
    const updateProfileState = useProfileStore(state => state.updateProfileState)
    const updateRulesPanelState = useRulesStore(state => state.updateRulesPanelState)
    const updateNavState = useNavStore(state => state.updateNavState)

    const hexData = GetHexes()
    let fullHexes = []
    const exploredHexRefs = useRef(new Array())

    const handleClick = (e) => {
        selectedHex = e.target
        selectedHex.classList.add("selected")
        updateHex({id: selectedHex.id, entry: selectedHex.getAttribute('entry')})
        
        if(oldHex){
            let getOldHex = document.getElementById(oldHex)
            getOldHex.classList.remove("selected")
        }
        updateDetailsState(true)
        updateProfileState(false)
        updateRulesPanelState(false)
        updateNavState(false)
        updateDetailsPage(1)
        
    }
   
    
    const hexCount = 1008
    let hexList=[];
    let correctHex
    

    if(hexData) {
        
        const exploredHexes = []
        const entryIds = []
        for (let i = 0; i < hexData.length; i++) {
            const el = hexData[i];
           
            exploredHexes.push(el.hexId)
        }
        let exploredCount = 0
        for (let i = 0; i < hexCount; i++) {
            const el = hexCount[i];
            
            if(exploredHexes.includes(i)){
               
                function isHex(hex) {
                    return hex.hexId === i;
                }

                correctHex = hexData.find(isHex)
               
                    
                hexList.push( <div id={i} ref={(element) => exploredHexRefs.current.push(element)} key={i} className={"hex explored cursor-pointer " + "h-" + i } entry={correctHex.id ? correctHex.id : null} onClick={ handleClick } ></div>)
                exploredCount++
            } else {
                hexList.push( <div id={i} key={i} className={"hex cursor-pointer " + "h-" + i } onClick={ handleClick } entry={null} ></div>)
            }
            
        }
    } else {
        for (let i = 0; i < hexCount; i++) {
            const el = hexCount[i];
            hexList.push( <div id={"h-" + i} key={i} className={"hex " + "h-" + i } ></div>)
        }
        
    }

    fullHexes = document.querySelectorAll(".hex")

    return <>
    {hexList}

    
    </>
}


    

    
     
