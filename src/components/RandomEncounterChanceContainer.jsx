

export default function RandomEncounterChanceContiainer({encounterChance}) {

    let checkEncounterChance
    if(encounterChance.encounter){
        checkEncounterChance = "Encounter!"
    }else {
        checkEncounterChance = "No Encounter"
    }
    return <div>
    <div className="bg-gray-600 text-white w-full justify-center">
        <h3 className="text-base font-bold px-5 py-2">Random Encounter Chance</h3>
    </div>
    <div  className={` bg-gray-200 flex flex-col md:flex-row gap-10 justify-center p-5`}>
        
        <p className="font-bold text-xl random-encounter-box" key={encounterChance.attempts}>{checkEncounterChance}</p>
    </div>
</div>
}