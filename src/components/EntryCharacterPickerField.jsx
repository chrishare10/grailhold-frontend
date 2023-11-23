export default function EntryCharacterPickerField({register, characters}) {

    let optionsArray = []
    if(characters){
        for (let i = 0; i < characters.length; i++) {
            const el = characters[i];
            optionsArray.push(<option value={el.id} key={el.id}>{el.title}</option>)
        }
    }

    return <div className="flex gap-3 items-center">
        <p>Choose attribution for this entry:</p>
        <select className="max-w-md bg-gray-100 p-2" {...register("characterPicker", { required: "Please choose a character" })}>
            {optionsArray.length ? <option value="">Choose One</option> : null }
            {optionsArray}
        </select>
      
    </div>
}