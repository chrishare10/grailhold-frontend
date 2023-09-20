import { useFixtureStore, useEncounterStore } from "../stores/MainStore"
import GetEncounter from "../fetch/GetEncounter";
import GetFixture from "../fetch/GetFixture";
import GenCard from "./GenCard";

export default function GeneratorPanel() {

    const encounterChanceState = useEncounterStore(state => state.encounterChanceState)
    const encounterState = useEncounterStore(state => state.encounterState)
    const fixtureState = useFixtureStore(state => state.fixtureState)

    let encounterData = GetEncounter(encounterState)
    let fixtureData = GetFixture(fixtureState)

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
        <div className="w-full">
            <div className="bg-gray-600 text-white w-full justify-center">
                <h3 className="text-base font-bold px-5 py-2">Encounter Generator</h3>
            </div>
            <div className="bg-gray-200 flex flex-col md:flex-row gap-10 p-5 justify-center">
                
                {encounterData.map((encounter) => (
                <GenCard  key={encounter.id} element={encounter.title}/>
                ))}
            </div>
        </div>
        <div className="w-full">
            <div className="bg-gray-600 text-white w-full justify-center">
                <h3 className="text-base font-bold px-5 py-2">Fixture Generator</h3>
            </div>
            <div className="bg-gray-200 flex flex-col md:flex-row gap-10 p-5 justify-center">
                {fixtureData.map((fixture) => (
                <GenCard key={fixture.id} element={fixture.title}/>
                ))}
            </div>
        </div>

    </div>

}