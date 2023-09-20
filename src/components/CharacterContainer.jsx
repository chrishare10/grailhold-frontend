import { useCharacterStore, useProfileStore } from "../stores/MainStore"
import CharacterSheet from "./CharacterSheet"

export default function CharacterContainer({character}) {

    const updateCharacterId = useCharacterStore(state => state.updateCharacterId)
    const updateProfPage = useProfileStore(state => state.updateProfPage)

    function handleClick(e){
        if(e.target.id == "back-btn"){
            updateCharacterId(false)
            updateProfPage(1)
        }
    }

    return<div className="flex flex-col gap-5 pb-14">
        <button id="back-btn" className="text-left" onClick={handleClick}>Back to profile</button>
        <h1 className="font-base text-4xl">{character.title}</h1>
       
        <CharacterSheet character={character}/>
    </div>
}

