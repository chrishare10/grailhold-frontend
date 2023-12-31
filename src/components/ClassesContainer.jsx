import { useState } from "react";
import SubClassDescriptionContainer from "./SubClassDescriptionContainer";

export default function ClassesContainer({register, watch, classEntries, subClassEntries, classPicker, setClassPicker, subclassDescription, setSubClassDescription, subclassPickerState, setSubClassPickerState }) {

    const [classPickerState, setClassPickerState ] = useState(false)
    
    let classOptions = []
    classOptions.push(<option value="" key="emptyClass">Choose Class</option>)
    for (let i = 0; i < classEntries.length; i++) {
        const element = classEntries[i];
        
        classOptions.push(<option value={element.id} key={element.id}>{element.title}</option>)
    }   

    let subClassOptions = []
    subClassOptions.push(<option value="" key="emptySub">Choose Sub-Class</option>)
    for (let i = 0; i < subClassEntries.length; i++) {
        const element = subClassEntries[i];
        
        subClassOptions.push(<option value={element.id} key={element.id}>{element.title}</option>)
    }   

    const onChange = (event) => {
        let value = parseInt(event.target.value)
        setClassPicker(value)
        setClassPickerState(true)
        setSubClassPickerState(false)
        
    }

    const onChangeSub = (event) => {
        if(event.target.value != ""){
            for (let i = 0; i < subClassEntries.length; i++) {
                const el = subClassEntries[i];
                if(el.id === event.target.value){
                    setSubClassDescription(el.textArea01)
                    setSubClassPickerState(true)
                }
            }
        }else {
            setSubClassPickerState(false)
        }
        
 
    }
    
    let classSelect =  <div className=""><select className="w-full p-2" {...register("classPicker", { required: true, onChange: onChange })}>{classOptions}</select></div>
    let subClassSelect =  <div className=""><select className="w-full p-2" {...register("subclassPicker", { required: true, onChange: onChangeSub })}>{subClassOptions}</select></div>

    return<div>
        <h2 className="font-bold">Class</h2>
        <div className="p-3 flex flex-col gap-3 bg-gray-200">
        {classSelect}
        {classPickerState ? subClassSelect : null} 
        {subclassPickerState ? <SubClassDescriptionContainer subclassDescription={subclassDescription} /> : null}
        </div> 
        
    </div>
}