import * as THREE from 'three'
import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { CameraControls, Sky } from '@react-three/drei'
import { useControls, button, buttonGroup, folder } from 'leva'
import { Water } from 'three-stdlib'
import { ModeledMap } from './ModeledMap'

extend({ Water })



function Waves() {
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(THREE.TextureLoader, '/assets/static/waternormal.jpg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  const geom = useMemo(() => new THREE.PlaneGeometry(100, 100), [])
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: .5,
      fog: false,
      format: gl.encoding
    }),
    [waterNormals]
  )
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta))
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
}

function KeyLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={[0, 20, 10]}
      lookAt={[0, 0, 0]}
      penumbra={1}
      castShadow
    />
  );
}

export default function FullCanvas() {
  
  return (
    <Canvas id="ocean-canvas" camera={{ position: [0, 15, 0], fov: 55, near: 1, far: 200 }}>
      <Scene />
    </Canvas>
  )
}


function Scene() {
  const cameraControlsRef = useRef()

  const { camera } = useThree()

  return <>
    <Suspense fallback={null}>
        <ModeledMap />
        <Waves />
      
      </Suspense>
      <KeyLight brightness={400} color={"#ffffff"} />
      <Sky scale={1000} sunPosition={[100, 100, -200]} azimuth={0.3} turbidity={0.4} />
      <CameraControls ref={cameraControlsRef} />
  </>
}