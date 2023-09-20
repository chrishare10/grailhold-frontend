import parse from "html-react-parser"

export default function CommentsListWrapper({entryId, comments}){
 
    let commentElements = []
    

    if(comments.length){
        for (let i = 0; i < comments.length; i++) {
            const el = comments[i];
            let parsedComment = parse(el.comment)
            commentElements.push(<div key={el.id} className="flex flex-col gap-1 jusitfy-between bg-gray-200 p-5 font-base"><div>{parsedComment}</div><p className="text-sm text-gray-500">{el.commentDate}</p></div>)
        }
    }
        
    return <div id="comments-container" className="flex flex-col gap-5 overflow-y-scroll">
        {commentElements}
    </div>
}