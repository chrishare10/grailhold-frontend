import EncounterGeneratorContainer from "./EncounterGeneratorContainer";
import FixtureGeneratorContainer from "./FixtureGeneratorContainer";
import { useEncounterStore } from "../stores/MainStore"

export default function GeneratorPanel() {

    const encounterChanceState = useEncounterStore(state => state.encounterChanceState)

    let checkEncounterChance
    if(encounterChanceState){
        checkEncounterChance = <p className="font-bold text-xl">Encounter!</p>
    }else {
        checkEncounterChance = <p className="font-bold text-xl">No Encounter</p>
    }
    
    return<div className="flex flex-col gap-10">
        <div>
            <div className="bg-gray-600 text-white w-full justify-center">
                <h3 className="text-base font-bold px-5 py-2">Random Encounter Chance</h3>
            </div>
            <div className={` bg-gray-200 flex flex-col md:flex-row gap-10 justify-center p-5`}>
                
                {checkEncounterChance}
                
            </div>
        </div>
        <EncounterGeneratorContainer />
        <FixtureGeneratorContainer/>
        
        

    </div>

}