

export default function AncestriesContainer({register, ancestriesEntries}) {

    let ancestriesOptions = []
    ancestriesOptions.push(<option value="" key="emptyClass">Choose Ancestry</option>)
    for (let i = 0; i < ancestriesEntries.length; i++) {
        const element = ancestriesEntries[i];
        
        ancestriesOptions.push(<option value={element.id} key={element.id}>{element.title}</option>)
    }   

    let ancestrySelect =  <div className=""><select className="w-full p-2" {...register("ancestryPicker", { required: true})}>{ancestriesOptions}</select></div>


    return <div>
        <h2 className="font-bold">Ancestry</h2>
        <div className="p-3 flex flex-col gap-3 bg-gray-200">
            {ancestrySelect}
        </div>
    </div>
}