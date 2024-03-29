

export default function MapMeshExplored({ exploredHexRefs, entryId, value, handleClick, setHexHover, hex, hexHover, hexName, containsStartingPointBoolean}) {
    
    return(
        <mesh
            name={value.name}
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
            <meshStandardMaterial roughness={1} color={containsStartingPointBoolean && hexHover == value.name.slice(5) ? '#437EF3' : containsStartingPointBoolean ? '#43AFF3' : hex.id == value.name.slice(5) ? '#08da84' : hexHover == value.name.slice(5) ? '#8C4A62' : '#F0433A'} />
        </mesh>
    )
}