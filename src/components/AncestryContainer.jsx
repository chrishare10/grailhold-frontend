import parse from "html-react-parser"
import { useState } from "react"

export default function AncestryContainer({ ancestry }) {
    
    // let [subclassDescription, setSubclassDescription] = useState('')
    let ancestryInjector = ''
    if(ancestry && ancestry.length){
       ancestryInjector = <div><h3>Ancestry: <span className="font-bold">{ancestry[0].title}</span></h3></div>
    }
   
  
    return <div>
        {ancestryInjector}
    </div>
}