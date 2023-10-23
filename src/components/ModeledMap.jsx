import React, { useRef, useState } from "react";
import { CycleRaycast, useCursor } from '@react-three/drei'
import { useGLTF } from "@react-three/drei";

export function ModeledMap(props) {
  const [{ objects, cycle }, set] = useState({ objects: [], cycle: 0 })

  const { nodes, materials } = useGLTF("/assets/static/Grailhold-map-hexcutout-04.glb");

  let hexIndex
  let meshes = []
  let hexName
  for (const [key, value] of Object.entries(nodes)) {
    const ref = useRef()
    const [hovered, setHovered] = useState(false)
    const [clicked, setClicked] = useState(false)
    useCursor(hovered)

    meshes.push(
      <mesh
        key={key}
        ref={ref}
        name={key}
        castShadow
        receiveShadow
        geometry={value.geometry}
        position={[-14.919, -0.085, -8.964]}
        rotation={[0, -1.571, 0]}
        scale={0.346}
        onClick={(e) => (e.stopPropagation(), setClicked(!clicked), logClick(parseInt(e.object.name.slice(5))))}
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={(e) => setHovered(false)}>
          <meshStandardMaterial roughness={1} transparent  color={clicked ? 'orange' : hovered ? 'aquamarine' : 'white'} />
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

function logClick(clicked){
  console.log(clicked)
}



useGLTF.preload("/assets/static/Grailhold-map-hexcutout-04.glb");

