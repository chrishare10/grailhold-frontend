import parse from "html-react-parser"
import { useState } from "react"

export default function FormerProfessionContainer({ formerProfession }) {
    
    // let [subclassDescription, setSubclassDescription] = useState('')
    let formerProfessionInjector = ''
    if(formerProfession && formerProfession.length){
        formerProfessionInjector = <div><h3>Former Profession: <span className="font-bold">{formerProfession[0].title}</span></h3></div>
    }
   
  
    return <div>
        {formerProfessionInjector}
    </div>
}