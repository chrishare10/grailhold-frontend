import * as THREE from 'three'
import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { CameraControls, Sky, Environment } from '@react-three/drei'
import { useControls, button, buttonGroup, folder } from 'leva'
import { Water } from 'three-stdlib'
import { ModeledMap } from './ModeledMap'
import GetHexes from '../fetch/GetHexes'
import { useGLTF } from "@react-three/drei";
import { Perf } from 'r3f-perf'
import { LayerMaterial, Depth, Noise } from 'lamina'
import { A11yAnnouncer } from '@react-three/a11y';

export default function FullCanvas() {

  let introAnimationComplete = sessionStorage.getItem("introAnimationComplete");
  let cameraPosition = [0, 20, 20]
  if(introAnimationComplete){
    cameraPosition = [0, 5, 12]
  }
  
  return <>
    <Canvas id="ocean-canvas" camera={{ position: cameraPosition, fov: 55, near: 1, far: 200 }}>
      <Scene />
    </Canvas>
    <A11yAnnouncer />
  </>
}


function Scene() {
  const cameraControlsRef = useRef()
  const { nodes, materials } = useGLTF("/assets/static/Grailhold-map-hexcutout-04.glb");
  const { camera } = useThree()

 
  
  const hexData = GetHexes()
  let fullHexes = []
  const exploredHexRefs = useRef(new Array())

  
  let animationComplete = false
  const initAnimation = (e) => {
    let introAnimationComplete = sessionStorage.getItem("introAnimationComplete");
    if(!introAnimationComplete){
      cameraControlsRef.current?.setLookAt(0, 5, 12, 0, 0, 0, true)
      sessionStorage.setItem("introAnimationComplete", true);
    }
  }


  const exploredHexes = []
  const exploredHexIds = []
  const entryIds = []
  if(hexData) {

    for (let i = 0; i < hexData.length; i++) {
      const el = hexData[i];
      exploredHexIds.push(String(el.hexId))
      exploredHexes.push({entry: el.id, hexId: String(el.hexId), containsStartingPointBoolean: el.containsStartingPointBoolean})
      
    }
    let exploredCount = 0
    
  }

  const bb = new THREE.Box3(
		new THREE.Vector3( -20.0, -20.0, -20.0 ),
		new THREE.Vector3( 20.0, 20.0, 20.0 )
	);

  cameraControlsRef.current?.setBoundary(bb)

  // Get current cameraControl rotation when movement stops.
  // if(cameraControlsRef.current){
  //   cameraControlsRef.current.addEventListener( 'sleep', () => {
  //     console.log(cameraControlsRef.current.camera.rotation.x)
  //   })
  // }
  
    
  return <>
    {/* <Perf position="top-left" /> */}
    <Suspense fallback={null}>
        {exploredHexes ? <ModeledMap exploredHexes={exploredHexes} exploredHexIds={exploredHexIds} nodes={nodes} hexData={hexData} initAnimation={initAnimation}/> : null }
        <mesh rotation-x={Math.PI * -0.5} position={[0,.2,0]}>
          <planeGeometry args={[300, 300]} />
          <meshStandardMaterial color={"#005C53"} metalness={.3} />
        </mesh>
      {/* <KeyLight brightness={20} color={"#ffffff"} /> */}
      <directionalLight intensity={5} color={"#F0433A"} position={[100, 100, -200]} />
      <ambientLight intensity={.7} color={"#3FCEF6"} />
      
      {/* <Sky scale={1000} sunPosition={[100, 100, -200]}  turbidity={0.4} /> */}
      {/* <directionalLight intensity={2} castShadow shadow-mapSize-height={1024} shadow-mapSize-width={1024} /> */}
        {/* <ambientLight intensity={0.4} /> */}
      <Bg />
      <CameraControls ref={cameraControlsRef} minDistance={5} maxDistance={30} maxPolarAngle={1.3} />
      
    </Suspense>
  </>
}

function Bg() {
  const mesh = useRef()
  // useFrame((state, delta) => {
  //   mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += delta
  // })
  return (
    <mesh ref={mesh} scale={100} >
      <sphereGeometry args={[1, 64, 64]} />
      <LayerMaterial color="#ffffff" attach="material" side={THREE.BackSide}>
        <Depth colorA="#F0433A" colorB="#540032" alpha={1} mode="multiply" near={0} far={600} origin={[100, -200, -200]} />
      </LayerMaterial>
    </mesh>
  )
}




useGLTF.preload("/assets/static/Grailhold-map-hexcutout-04.glb");