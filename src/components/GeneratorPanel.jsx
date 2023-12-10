import EncounterGeneratorContainer from "./EncounterGeneratorContainer";
import FixtureGeneratorContainer from "./FixtureGeneratorContainer";
import { useEncounterStore } from "../stores/MainStore"
import RandomEncounterChanceContiainer from "./RandomEncounterChanceContainer";

export default function GeneratorPanel() {

    const encounterChanceState = useEncounterStore(state => state.encounterChanceState)

    
    
    return<div className="flex flex-col gap-10">
        
        <RandomEncounterChanceContiainer encounterChance={encounterChanceState} />
        <EncounterGeneratorContainer />
        <FixtureGeneratorContainer/>
        
        

    </div>

}