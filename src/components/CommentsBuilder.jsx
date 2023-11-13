import gql from "graphql-tag"
import request from 'graphql-request'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form';
import { useHexStore } from "../stores/MainStore"
import { useEffect, useState } from "react";
import EntryCharacterPickerField from "./EntryCharacterPickerField";
import toast from 'react-hot-toast';

let COMMENT = gql`
    mutation NewComment($newParentId: ID, $ownerId: ID, $name: String, $email: String, $comment: String, $enabled: Boolean, $characterPicker: [Int]) {
    saveComment(newParentId: $newParentId, ownerId: $ownerId, name: $name, email: $email, comment: $comment, enabled: $enabled, characterPicker: $characterPicker) {
        id
        ownerId
        name
        email
        comment
        ... on Comment {
            characterPicker {
                id
                title
            }
        }
    }
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

export default function CommentsBuilder({entryId, userId, username, email, characters}) {

    const updateCommentState = useHexStore(state => state.updateCommentState)
    const reloadEntryIncrement = useHexStore(state => state.reloadEntryIncrement)

   

    const { register, handleSubmit, watch, control, setValue } = useForm();
    const textAreaDirty = watch("comment", false)

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
                "comment": variables.comment,
                "characterPicker": parseInt(variables.characterPicker)
            }
        }),
        onError: (error) => {
          toast.error(`Could not add comment`, {position: 'top-center',})
        },
        onSuccess: () => {
          toast.success(`Comment added`, {position: 'top-center',})
          updateCommentState()
        }
    })
    
    
    const onSubmit = (variables) => {
        saveComment.mutate(variables)
    }
   
   

    return <div>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <textarea id="comment" className="p-3" rows="2" cols="50" placeholder="leave a comment" {...register('comment')}></textarea>
        {textAreaDirty ? <EntryCharacterPickerField characters={characters} register={register}/> : null }
        {textAreaDirty ? <div><input type="submit" className="bg-gColorOne cursor-pointer hover:bg-gColorTwo text-white py-2 w-60 mx-auto" /></div> : null }
    </form>
</div>
}