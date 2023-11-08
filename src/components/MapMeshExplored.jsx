

export default function MapMeshExplored({ exploredHexRefs, entryId, value, handleClick, setHexHover, hex, hexHover}) {

    return(
        <mesh
            name={value.name.slice(5)}
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
            <meshStandardMaterial roughness={1} metalness={.5} color={hex.id == value.name.slice(5) ? '#8C4A62' : hexHover == value.name.slice(5) ? '#F2B807' : '#F0433A'} />
        </mesh>
    )
}