import { useRulesStore } from "../stores/MainStore"
import DiceRoller from "./DiceRoller"


export default function DiceRollerPanel() {
    const diceState = useRulesStore(state => state.diceState)
    const numberOfDice = useRulesStore(state => state.numberOfDice)
    const addDice = useRulesStore(state => state.addDice)
    const removeDice = useRulesStore(state => state.removeDice)
    const result = useRulesStore(state => state.result)
    const updateResult = useRulesStore(state => state.updateResult)
    const updateDiceState = useRulesStore(state => state.updateDiceState)

    let diceFormatted = []
    let fresh
    function handleDiceClick(e) {
        if(e.target.id === "dice-roll-btn"){
            fresh = DiceRoller(numberOfDice)

            updateResult(fresh)
            updateDiceState(true)
        } else if(e.target.id === "add-dice-btn") {
            if(numberOfDice < 20) {
            addDice()
            }
        } else if(e.target.id === "remove-dice-btn") {
            if(numberOfDice > 1) {
                removeDice()
            }
        } else if(e.target.id === "clear-dice-btn") {
            updateDiceState(false)
        }
    } 

    for (let i = 0; i < result.length; i++) {
        const dice = {
            diceResult: result[i],
            key: i
        };

        diceFormatted.push(diceRender(dice))
    }

    return <div className="py-20 flex flex-col gap-5 w-full px-10 overflow-y-scroll">
    
    <button id="dice-roll-btn" onClick={handleDiceClick} className="bg-gColorOne text-white py-2 px-3">
        Roll Dice
    </button>
    <div className="w-full grid grid-cols-2 gap-5">
        <button id="add-dice-btn" onClick={handleDiceClick} className="bg-gColorOne text-white py-2 px-3">
            Add Dice
        </button>
        <button id="remove-dice-btn" onClick={handleDiceClick} className="bg-gColorOne text-white py-2 px-3">
            Remove Dice
        </button>
    </div>
    
    <div className="w-full flex flex-row justify-center">
        <p>Dice to roll: { numberOfDice }</p>
    </div>
    <div className={`${diceState ? "block" : "hidden"} w-full flex flex-wrap gap-5 justify-center`}>
        {diceFormatted}
    </div>
    
    <button id="clear-dice-btn" onClick={handleDiceClick} className="bg-gColorOne text-white py-2 px-3">Clear Dice</button>

        
    </div>

}



const diceRender = (result) => {
    let dice
    if(result.diceResult === 1 ) {
        dice = <div key={result.key} className={`dice-1 shrink-0 w-20 h-20 inline-flex justify-center items-center bg-gray-200 }`} >
                    <div className="flex flex-col gap-2 justify-around w-full h-full p-3">
                        <div className="flex justify-around gap-5 h-full items-center">
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                        </div>
                    </div>
                </div>
    }else if(result.diceResult === 2){
        dice = <div key={result.key} className={`dice-2 shrink-0 w-20 h-20 inline-flex justify-center items-center bg-gray-200 }`} >
                    <div className="flex flex-col gap-2 justify-around w-full h-full p-3">
                        <div className="flex justify-end gap-5 h-full items-center">
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                        </div>
                        <div className="flex justify-start gap-5 h-full items-center">
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                        </div>
                    </div>
                </div>
    }else if(result.diceResult === 3){
        dice = <div key={result.key} className={`dice-3 shrink-0 w-20 h-20 inline-flex justify-center items-center bg-gray-200 }`} >
                    <div className="flex flex-col gap-2 justify-around w-full h-full p-3">
                        <div className="flex justify-end gap-5 h-full items-center">
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                        </div>
                        <div className="flex justify-around gap-5 h-full items-center">
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                        </div>
                        <div className="flex justify-start gap-5 h-full items-center">
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                        </div>
                    </div>
                </div>
    }else if(result.diceResult === 4){
        dice = <div key={result.key} className={`dice-4 shrink-0 w-20 h-20 inline-flex justify-center items-center bg-gray-200 }`} >
                    <div className="flex flex-col gap-2 justify-around w-full h-full p-3">
                        <div className="flex justify-around gap-5 h-full items-center">
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                        </div>
                        <div className="flex justify-around gap-5 h-full items-center">
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                        </div>
                    </div>
                </div>
    }else if(result.diceResult === 5){
        dice = <div key={result.key} className={`dice-5 shrink-0 w-20 h-20 inline-flex justify-center items-center bg-gray-200 }`} >
                    <div className="flex flex-col gap-2 justify-around w-full h-full p-3">
                        <div className="flex justify-around gap-5 h-full items-center">
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                        </div>
                        <div className="flex justify-around gap-5 h-full items-center">
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                        </div>
                        <div className="flex justify-around gap-5 h-full items-center">
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                        </div>
                    </div>
                </div>
    }else if(result.diceResult === 6){
        dice = <div key={result.key} className={`dice-6 shrink-0 w-20 h-20 inline-flex justify-center items-center bg-gray-200 }`} >
                    <div className="flex flex-col gap-2 justify-around w-full h-full p-3">
                        <div className="flex justify-around gap-5 h-full items-center">
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                        </div>
                        <div className="flex justify-around gap-5 h-full items-center">
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                        </div>
                        <div className="flex justify-around gap-5 h-full items-center">
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                            <div className="bg-gColorTwo shrink-0 w-3 h-3 rounded-full justify-center items-center"></div>
                        </div>
                    </div>
                </div>
    }

    return dice
    
}