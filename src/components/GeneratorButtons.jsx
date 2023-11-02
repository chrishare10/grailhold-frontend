import { useEncounterStore, useFixtureStore } from "../stores/MainStore"



export default function GeneratorButtons() {

    const updateFixtureState = useFixtureStore(state => state.updateFixtureState)
    const updateEncounterState = useEncounterStore(state => state.updateEncounterState)
    const calcEncounterChance = useEncounterStore(state => state.calcEncounterChance)

    function handleGenClick(e) {
        if(e.target.id === "encounter-gen-btn"){
            updateEncounterState()
        }else if(e.target.id === "fixture-gen-btn"){
            updateFixtureState()
        }else if(e.target.id === "encounter-chance-btn"){
            calcEncounterChance()
        }
    }
    
    return <div className="flex flex-col gap-3">
    <button id="encounter-chance-btn" onClick={handleGenClick} className="bg-gColorOne text-white py-2 px-3">
        Encounter Chance
    </button>
    <button id="encounter-gen-btn" onClick={handleGenClick} className="bg-gColorOne text-white py-2 px-3">
        Encounter Generator
    </button>
    <button id="fixture-gen-btn" onClick={handleGenClick} className="bg-gColorOne text-white py-2 px-3">
        Fixture Generator
    </button>
    </div>
}