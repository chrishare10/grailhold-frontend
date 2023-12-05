import { useHexStore } from "../stores/MainStore"

export default function SelectedHexDisplay() {

    const hex = useHexStore(state => state.hex)
    let hexId = hex.id
    let entryId = hex.entry

    return <div className="text-white">
        <p>Hex #{hexId ? hexId : entryId ? entryId : ""}</p>
    </div>
}