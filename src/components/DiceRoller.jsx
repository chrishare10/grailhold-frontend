import { DiceRoll, exportFormats } from '@dice-roller/rpg-dice-roller';



export default function DiceRoller(number) {
    let rollsArray = []

    let roll = new DiceRoll(`${number}d6`);
    let jsonString = roll.export(exportFormats.OBJECT);
    for (let i = 0; i < jsonString.rolls[0].rolls.length; i++) {
        const el = jsonString.rolls[0].rolls[i];
        rollsArray.push(el.calculationValue)
    }

    return rollsArray

}


