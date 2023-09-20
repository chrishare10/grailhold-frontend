import parse from "html-react-parser"
import { useState } from "react"

export default function ClassContainer({ currentClass, subclass }) {
    
    // let [subclassDescription, setSubclassDescription] = useState('')
    let classInjector = ''
    let subclassInjector = []
    let subclassDescription = ''
    if(currentClass && currentClass.length){
        classInjector = <div><h3>Class: <span className="font-bold">{currentClass[0].title}</span></h3></div>
    }
    if(subclass && subclass.length) {
        for (let i = 0; i < subclass.length; i++) {
            const el = subclass[i];
            subclassDescription = el.textArea01
            subclassInjector.push(<div key={el.id}><h4>Feat: <span className="font-bold">{el.title}</span></h4><div className="p-5 bg-gray-100">{parse(subclassDescription)}</div></div>)
        }
    }
  
    return <div>
        {classInjector}
        {subclassInjector}
    </div>
}