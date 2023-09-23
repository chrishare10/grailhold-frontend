import gql from "graphql-tag"
import request from 'graphql-request'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form';
import { useHexStore } from "../stores/MainStore"
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';

let COMMENT = gql`
    mutation NewComment($newParentId: ID, $ownerId: ID, $name: String, $email: String, $comment: String, $enabled: Boolean) {
    saveComment(newParentId: $newParentId, ownerId: $ownerId, name: $name, email: $email, comment: $comment, enabled: $enabled) {
        id
        ownerId
        name
        email
        comment
    }
}
`
const endpoint = process.env.VITE_API_ENDPOINT
let headers = {
    authorization: process.env.VITE_API_AUTH,
}

let jwtToken = false 
if(sessionStorage.getItem("jwtToken")) {
    jwtToken = sessionStorage.getItem("jwtToken");
    headers = {
        authorization: `JWT ${jwtToken}`
    }
}

export default function CommentsBuilder({entryId, userId, username, email}) {

    const updateCommentState = useHexStore(state => state.updateCommentState)
    const [commentsState, setCommentsState] = useState()

    let testing = null

    const { register, handleSubmit, watch, control, setValue } = useForm();


    // mutation
    let saveComment = useMutation({
        mutationFn: async (variables) =>
          request({
            url: endpoint,
            document: COMMENT,
            requestHeaders: headers,
            variables: {
                "ownerId": entryId,
                "userId": userId,
                "name": username,
                "email": email,
                "enabled": true,
                "comment": variables.comment
            }
        }),
        onError: (error) => {
          toast.error(`Could not add comment`, {position: 'top-center',})
        },
        onSuccess: () => {
          toast.success(`Comment added`, {position: 'top-center',})
        }
    })
    

    useEffect(() => {
        updateCommentState(testing)
    }, [testing])
    
    const onSubmit = (variables) => {
        saveComment.mutate(variables)
    }
   
   

    return <div>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <textarea id="comment" className="p-3" rows="2" cols="50" placeholder="leave a comment" {...register('comment')}></textarea>
        <div>
            <input type="submit" className="bg-blue-300 cursor-pointer hover:bg-blue-400 font-bold py-2 w-60 mx-auto" />
        </div>
    </form>
</div>
}