import parse from "html-react-parser"
import gql from "graphql-tag"
import request from 'graphql-request'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast';
import { useHexStore } from "../stores/MainStore"

const DELETE_COMMENT = gql`
    mutation DeleteComment($id: ID!) {
        deleteComment(id: $id)
    }

`
const endpoint = import.meta.env.VITE_API_ENDPOINT
    let headers = {
        authorization: import.meta.env.VITE_API_AUTH,
    }

    let jwtToken = false 
    if(sessionStorage.getItem("jwtToken")) {
        jwtToken = sessionStorage.getItem("jwtToken");
        headers = {
            Authorization: `JWT ${jwtToken}`,
            authorization: import.meta.env.VITE_API_AUTH
        }
    }

export default function CommentsListWrapper({entryId, comments, userId}){

    const updateCommentState = useHexStore(state => state.updateCommentState)
 
    let commentElements = []
    
    const deleteComment = useMutation({
        mutationFn: async (deleteCommentId) => 
        request({
            url: endpoint,
            document: DELETE_COMMENT,
            requestHeaders: headers,
            variables: {
                "id": deleteCommentId
            }
        }),
        onError: (error) => {
          toast.error(`Could not delete comment`, {position: 'top-center',})
        },
        onSuccess: () => {
          toast.success(`Comment deleted`, {position: 'top-center',})
          updateCommentState()
        }
    })
    let deleteCommentId = null
    function deleteCommentTrigger(e){
        deleteCommentId = parseInt(e.target.id)
        deleteComment.mutate(deleteCommentId)
    }

    if(comments.length){
        for (let i = 0; i < comments.length; i++) {
            const el = comments[i];
            let authorCharacter = null 
            
            if(el.characterPicker.length){
                authorCharacter = el.characterPicker[0].title
            }

            let parsedComment = parse(el.comment)
            commentElements.push(<div key={el.id} className="flex flex-col gap-1 jusitfy-between bg-gray-200 p-5 font-base"><div>{parsedComment}</div><p className="text-sm text-gray-500">{authorCharacter ? `${authorCharacter} - ` : null }{el.commentDate}</p>{el.userId === parseInt(userId) ? <div><button id={el.id} onClick={deleteCommentTrigger} className="text-gray-500 cursor-pointer underline text-sm">Delete</button></div> : null }</div>)
        }
    }
  
    return <div id="comments-container" className="flex flex-col gap-5 overflow-y-scroll">
        {commentElements}
    </div>
}