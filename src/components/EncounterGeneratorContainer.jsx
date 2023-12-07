import GenCard from "./GenCard"
import { useEncounterStore } from "../stores/MainStore"
import GetEncounter from "../fetch/GetEncounter";

export default function EncounterGeneratorContainer() {
    const encounterState = useEncounterStore(state => state.encounterState)
    let encounterData = GetEncounter(encounterState)

    return <div className="w-full">
    <div className="bg-gray-600 text-white w-full justify-center">
        <h3 className="text-base font-bold px-5 py-2">Encounter Generator</h3>
    </div>
    <div className="bg-gray-200 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10 p-5 justify-center">
        
        {encounterData.map((encounter) => (
        <GenCard  key={encounter.id} cardData={encounter}/>
        ))}
    </div>
</div>
}