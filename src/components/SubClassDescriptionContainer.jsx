import parse from "html-react-parser"

export default function SubClassDescriptionContainer({subclassDescription}) {

    let parsedDescription = ""
    if(subclassDescription) {
        parsedDescription = parse(subclassDescription)
    }
   
    return <div className="p-5 bg-gray-100">
        {parsedDescription}
    </div>
}