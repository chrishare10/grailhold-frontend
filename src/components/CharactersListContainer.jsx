import { useCharacterStore, useProfileStore } from "../stores/MainStore"

export default function CharacterListContainer({characters}) {

    const updateCharacterId = useCharacterStore(state => state.updateCharacterId)
    const updateProfPage = useProfileStore(state => state.updateProfPage)
 
    let charactersList = []

    function handleClick(e) {
        if(e.target.id === "new-character-btn"){
            updateProfPage(2)
        }else {
        updateCharacterId(e.target.id)
        updateProfPage(3)
        }
    }

    for (let i = 0; i < characters.length; i++) {
        const character = characters[i];
        charactersList.push(<button key={character.id} id={character.id} className="p-5 bg-white rounded-lg  transform hover:-translate-y-1 transition-all w-full" onClick={handleClick}>{character.title}</button>)
    }

    const newCharacterBtn = <div className="flex w-full justify-end"><button id="new-character-btn" className="text-gray-500" onClick={handleClick}>New Character</button></div>
    
    return <div className="flex flex-col gap-2">
    <h2 className="font-bold">Characters</h2>
    <div className="p-5 bg-gray-200 flex flex-col gap-2 max-h-60 overflow-y-scroll">
        {characters.length ? charactersList : <p>No characters built</p>} 
    </div>
    {characters.length <= 3 ? newCharacterBtn : null}
    </div>
}