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
        const dice = result[i];
        diceFormatted.push(<div className={`w-20 h-20 flex justify-center items-center ${ dice === 6 ? "bg-gold" : dice <= 3 ? "bg-gray-600 text-white" : "bg-gray-200" }`} key={i}>{dice}</div>)
    }

    return <div className="py-20 flex flex-col gap-5 w-full px-10 overflow-y-scroll">
    
    <button id="dice-roll-btn" onClick={handleDiceClick} className="bg-blue text-white py-2 px-3">
        Roll Dice
    </button>
    <div className="w-full grid grid-cols-2 gap-5">
        <button id="add-dice-btn" onClick={handleDiceClick} className="bg-blue text-white py-2 px-3">
            Add Dice
        </button>
        <button id="remove-dice-btn" onClick={handleDiceClick} className="bg-blue text-white py-2 px-3">
            Remove Dice
        </button>
    </div>
    
    <div className="w-full flex flex-row justify-center">
        <p>Dice to roll: { numberOfDice }</p>
    </div>
    <div className={`${diceState ? "block" : "hidden"} w-full flex flex-wrap gap-5 justify-center`}>
        {diceFormatted}
    </div>
    
    <button id="clear-dice-btn" onClick={handleDiceClick} className="bg-blue text-white py-2 px-3">Clear Dice</button>
    </div>

}