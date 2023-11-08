

export default function MapMeshUnexplored({exploredHexRefs, entryId, value, handleClick, setHexHover, hex, hexHover}) {

    return(
        <mesh
            name={entryId}
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
            <meshStandardMaterial roughness={1} color={hex.id == value.name.slice(5) ? '#8C4A62' : hexHover == value.name.slice(5) ? '#F2B807' : '#D6D58E'} />
        </mesh>
    )
}