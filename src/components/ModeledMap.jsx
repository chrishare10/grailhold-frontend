import React, { useRef, useState } from "react";
import { CycleRaycast, useCursor } from '@react-three/drei'
import { useHexStore, useProfileStore, useRulesStore, useNavStore } from "../stores/MainStore"

let selectedHex
export function ModeledMap({exploredHexes, exploredHexIds, nodes, hexData}) {
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
  if(hexData){

   
    for (const [key, value] of Object.entries(nodes)) {
    
      if(exploredHexIds.includes(key.slice(5))){

        for (let i = 0; i < exploredHexes.length; i++) {
          const element = exploredHexes[i];
          if(element.hexId === key.slice(5)) {
            entryId = element.entry
          }
        }
        
        meshes.push(
          <mesh
            key={key}
            name={key}
            ref={(element) => exploredHexRefs.current.push(element)}
            entry={entryId ? entryId : null}
            castShadow
            receiveShadow
            geometry={value.geometry}
            position={[-14.919, -0.085, -8.964]}
            rotation={[0, -1.571, 0]}
            scale={0.346}
            onClick={(e) => (e.stopPropagation(), handleClick(e.object))}
            onPointerOver={(e) => (e.stopPropagation(), setHexHover(value.name.slice(5)))}
            onPointerOut={(e) => setHexHover(false)}
            >
              <meshStandardMaterial roughness={1} transparent  color={hex.id == value.name.slice(5) ? 'orange' : hexHover == value.name.slice(5) ? 'aquamarine' : 'green'} />
            </mesh>
          )
      } else {
        meshes.push(
          <mesh
            key={key}
            name={key}
            entry={null}
            castShadow
            receiveShadow
            geometry={value.geometry}
            position={[-14.919, -0.085, -8.964]}
            rotation={[0, -1.571, 0]}
            scale={0.346}
            onClick={(e) => (e.stopPropagation(), handleClick(e.object))}
            onPointerOver={(e) => (e.stopPropagation(), setHexHover(value.name.slice(5)))}
            onPointerOut={(e) => setHexHover(false)}
            >
              <meshStandardMaterial roughness={1} transparent  color={hex.id == value.name.slice(5) ? 'orange' : hexHover == value.name.slice(5) ? 'aquamarine' : 'white'} />
            </mesh>
          )
      }
    }
  }
  return <>
  <CycleRaycast onChanged={(objects, cycle) => set({ objects, cycle })} />
  
    <group dispose={null}>
      {meshes ? meshes : null}
    </group>
  </>
}





