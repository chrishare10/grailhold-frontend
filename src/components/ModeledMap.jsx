import React, { useRef, useState } from "react";
import { CycleRaycast, useCursor } from '@react-three/drei'
import { useGLTF } from "@react-three/drei";

export function ModeledMap(props) {
  const [{ objects, cycle }, set] = useState({ objects: [], cycle: 0 })

  const { nodes, materials } = useGLTF("/assets/static/Grailhold-map-hexcutout-04.glb");

  let hexIndex
  let meshes = []
  // for (let i = 1; i < 437; i++) {
  //   hexIndex = key.geometry
  //   meshes.push(
  //   <mesh
  //     key={i}
  //     castShadow
  //     receiveShadow
  //     geometry={hexIndex}
  //     material={materials.Material}
  //     position={[-14.919, -0.085, -8.964]}
  //     rotation={[0, -1.571, 0]}
  //     scale={0.346}
  //   />)
  // }

  for (const [key, value] of Object.entries(nodes)) {
    const ref = useRef()
    const [hovered, setHovered] = useState(false)
    const [clicked, setClicked] = useState(false)
    useCursor(hovered)
    meshes.push(
      <mesh
        key={key}
        ref={ref}
        castShadow
        receiveShadow
        geometry={value.geometry}
        
        position={[-14.919, -0.085, -8.964]}
        rotation={[0, -1.571, 0]}
        scale={0.346}
        onClick={(e) => (e.stopPropagation(), setClicked(!clicked))}
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={(e) => setHovered(false)}>
          <meshStandardMaterial roughness={1} transparent opacity={0.6} color={clicked ? 'orange' : hovered ? 'aquamarine' : 'white'} />
        </mesh>
      )
  }
  return <>
  <CycleRaycast onChanged={(objects, cycle) => set({ objects, cycle })} />
  
    <group {...props} dispose={null}>
      {meshes ? meshes : null}
    </group>
  </>
}



useGLTF.preload("/assets/static/Grailhold-map-hexcutout-04.glb");

