import React, { useRef, useState } from "react";
import { CycleRaycast, useCursor } from '@react-three/drei'
import { useHexStore, useProfileStore, useRulesStore, useNavStore } from "../stores/MainStore"
import { A11y } from '@react-three/a11y'
import MapMeshExplored from "./MapMeshExplored";
import MapMeshUnexplored from "./MapMeshUnexplored";

let selectedHex
export function ModeledMap({exploredHexes, exploredHexIds, nodes, hexData, initAnimation}) {
  const updateHex = useHexStore(state => state.updateHex)
  const hex = useHexStore(state => state.hex)
  const updateHexHover = useHexStore(state => state.updateHexHover)
  const updateDetailsState = useHexStore(state => state.updateDetailsState)
  const updateDetailsPage = useHexStore(state => state.updateDetailsPage)
  const updateProfileState = useProfileStore(state => state.updateProfileState)
  const updateRulesPanelState = useRulesStore(state => state.updateRulesPanelState)
  const updateNavState = useNavStore(state => state.updateNavState)
  const [{ objects, cycle }, set] = useState({ objects: [], cycle: 0 })
  const exploredHexRefs = useRef(new Array()) 


  const [hexHover, setHexHover] = useState(false)
 

  //  console.log(hex)

  const hexCount = Object.entries(nodes)
  let correctHex
  let meshes = []
  
 
  useCursor(hexHover)
  
  function handleClick(e){
    // selectedHex = e.target
    // parseInt(e.object.name.slice(5))
    // updateHex({id: selectedHex.id, entry: selectedHex.getAttribute('entry')})
    
   
    updateHex({id: parseInt(e.name.slice(5)), entry: e.entry})
    updateDetailsState(true)
    updateProfileState(false)
    updateRulesPanelState(false)
    updateNavState(false)
    updateDetailsPage(1)
  }

  let entryId
  let containsStartingPointBoolean
  let hexLength = Object.entries(nodes).length 
  if(hexData){
    for (const [key, value] of Object.entries(nodes)) {
      if(exploredHexIds.includes(key.slice(5))){
        for (let i = 0; i < exploredHexes.length; i++) {
          const element = exploredHexes[i];
          if(element.hexId === key.slice(5)) {
            entryId = element.entry
            containsStartingPointBoolean = element.containsStartingPointBoolean
          }
          
        }
        meshes.push(
          <A11y key={key} role="button" focusCall={()=> console.log(`Hex ${key.slice(5)} in focus`)}>
            <MapMeshExplored key={key} exploredHexRefs={exploredHexRefs} containsStartingPointBoolean={containsStartingPointBoolean} entryId={entryId} value={value} handleClick={handleClick} setHexHover={setHexHover} hex={hex} hexHover={hexHover} />
          </A11y>
          )
      } else {
        
        meshes.push(
            <MapMeshUnexplored key={key} exploredHexRefs={exploredHexRefs} entryId={key} value={value} handleClick={handleClick} setHexHover={setHexHover} hex={hex} hexHover={hexHover} />
          )
      }
      
      if(parseInt(key.slice(5)) + 1 == hexLength) {
        initAnimation()
      }
    }
  }
  return <>
  {/* <CycleRaycast onChanged={(objects, cycle) => set({ objects, cycle })} /> */}
  
    <group dispose={null}>
      {meshes ? meshes : null}
    </group>
  </>
}





