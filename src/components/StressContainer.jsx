import { useEffect, useState } from 'react'
import GetMannerisms from '../fetch/GetMannerisms';
import GetEntries from '../fetch/GetEntries';
import { Controller } from "react-hook-form";
import Rating from "react-rating";

export default function StressContainer({register, control, setValue, mannerisms}) {

    const [newMannerism, setNewMannerism] = useState(false)
    const [mannerismIds, setMannerismIds] = useState('')
    const [currentMannerisms, setCurrentMannerisms] = useState([])

    let mannerismBoxes = []
    let fetchedCurrentMannerisms = []

    

    

    // Current Mannerisms
   
    useEffect(() => {
        
        let mannerismIdsRaw = []
        if(mannerisms) {
            for (let i = 0; i < mannerisms.length; i++) {
                const el = mannerisms[i];
                mannerismIdsRaw.push(el.id)
            }
            setMannerismIds(mannerismIdsRaw)
        } 

        
    }, [mannerisms])
    
    fetchedCurrentMannerisms = GetEntries(mannerismIds)
    let mannerismList = []
    if(fetchedCurrentMannerisms){
        mannerismList = fetchedCurrentMannerisms.entries.map(el => <button key={el.id} className="bg-white rounded-lg p-3 font-base text-sm text-black text-left" id={el.id}>{el.title}</button>)
    } 

    const onClick = (e) => {
        if(e.target.id === "add-mannerism-btn" && newMannerism){
            setNewMannerism(false)
        }else if(e.target.id === "add-mannerism-btn"){
            setNewMannerism(true)
        }
    }
    
    

    let mannerismEntries = []

    let getMannerisms = GetMannerisms()
    if(getMannerisms) {
        mannerismEntries = getMannerisms.entries
    }

    let mannerismOptions = []
    for (let i = 0; i < mannerismEntries.length; i++) {
        const element = mannerismEntries[i];
        
        mannerismOptions.push(<option value={element.id} key={element.id}>{element.title}</option>)
    }  

    let mannerismSelect =  <div><div><p>Choose New Mannerism</p></div><select className="w-full p-2" {...register("mannerismPicker", { required: false })}>{mannerismOptions}</select></div>
    
    

    return<div className="flex flex-col gap-5">
        <div>
            <h2 className="font-bold">Stress Track</h2>
            <div id="stress-track">
                <div>
                <Controller
                    control={control}
                    name="stress"
                    defaultValue={0}
                    render={({ field: { value,  onChange, name } }) => (
                    <Rating 
                    fullSymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><rect x="2.93" y="2.93" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.1421 10)" width="14.14" height="14.14"/></svg>} 
                    emptySymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><path d="M10,0L0,10l10,10l10-10L10,0z M4,10l6-6l6,6l-6,6L4,10z"/></svg>} 
                    initialRating={value} 
                    start={0} 
                    stop={12} 
                    onChange={onChange} 
                    className="rating-dimonds"
                    />
                    )}
                />
                </div>
                <div>
                    <button onClick={() => { setValue("stress", 0)}} className="text-sm text-gray-500">reset stress</button>
                </div>
            </div>
        </div>
        <div className="flex flex-col" id="mannerisms-wrapper">
            <div className="flex justify-between">
                <h2 className="font-bold">Mannerisms</h2>
                <button id="add-mannerism-btn" className="text-sm text-gray-500" onClick={onClick}>{newMannerism ? `` : `add mannerism`}</button>
            </div>
            <div className="bg-gray-200 p-3 flex flex-col gap-3">
                <div className="flex flex-wrap gap-3">
                {mannerismList}
                </div>
                {newMannerism ? mannerismSelect : null}
            </div>
        </div>
    </div>
}