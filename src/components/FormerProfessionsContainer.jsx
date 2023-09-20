import { useState } from "react";

export default function FormerProfessionsContainer({register,formerProfessionsEntries}) {

    let professionsOptions = []
    professionsOptions.push(<option value="" key="emptyClass">Choose One</option>)
    for (let i = 0; i < formerProfessionsEntries.length; i++) {
        const element = formerProfessionsEntries[i];
        
        professionsOptions.push(<option value={element.id} key={element.id}>{element.title}</option>)
    }   


  
    
    let professionsSelect =  <div className=""><div></div><select className="w-full p-2" {...register("formerProfessionsPicker", { required: true })}>{professionsOptions}</select></div>

    return<div>
        <h2 className="font-bold">Former Professions</h2>
        <div className="p-3 flex flex-col gap-3 bg-gray-200">
        {professionsSelect}
        </div> 
        
    </div>
}