import { useHexStore, useUserStore } from "../stores/MainStore"
import gql from "graphql-tag"
import request from 'graphql-request'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form';
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import { ErrorMessage } from "@hookform/error-message"
import StarterKit from '@tiptap/starter-kit'
import EditorMenuBar from './EditorMenuBar'
import EntryTitleField from "./EntryTitleField";
import GetCharacters from "../fetch/GetCharacters";
import EntryCharacterPickerField from "./EntryCharacterPickerField";
import toast from 'react-hot-toast';




const endpoint = import.meta.env.VITE_API_ENDPOINT
const headers = {
    authorization: import.meta.env.VITE_API_AUTH,
}

export default function EntryBuilder({buildId, hexState, characters}) {

    const updateDetailsPage = useHexStore(state => state.updateDetailsPage)
    const userId = useUserStore(state => state.userId)

   
    let entryType
    let attributionState = false

    if(buildId && buildId === 1){
        entryType = "fixtures"
    }else if(buildId && buildId === 12){
        entryType = "fables"
        attributionState = true
    }else if(buildId && buildId === 11){
        entryType = "fabrications"
        attributionState = true
    }

   

    const CREATE_ENTRY = gql`
        mutation($title: String, $authorId: ID, $associatedHex: [Int],  $textArea01: String, $characterPicker: [Int]) {
            save_${entryType}_default_Entry(title:$title, authorId: $authorId, entryPicker01: $associatedHex, textArea01: $textArea01, characterPicker: $characterPicker) {
                authorId
                enabled
                title
            }
        }
    `
    
    function handleClick(e){
        if(e.target.id == "back-to-overview"){
            updateDetailsPage(1)
        }
    }

    
    const { register, handleSubmit, watch, control, setValue, formState: { errors }, } = useForm();

    let mutation = useMutation({
        mutationFn: async (variables) =>
            request({
            url: endpoint,
            document: CREATE_ENTRY,
            requestHeaders: headers,
            variables: {
                "title": variables.title,
                "authorId": variables.authorId,
                "associatedHex": variables.hexState,
                "textArea01": variables.description,
                "characterPicker": variables.characterPicker
            }
        }),
        onError: (error) => {
          toast.error(`Could not create entry`, {position: 'top-center',})
        },
        onSuccess: () => {
          toast.success(`Entry created`, {position: 'top-center',})
        }
        
    })
    
    
    
    const onSubmit = (variables) => {
        let parsedId = parseInt(hexState.entry)
        if(userId){
            variables.authorId = parseInt(userId)
            variables.characterPicker= parseInt(variables.characterPicker)
            variables.enabled = true
            variables.hexState = parsedId
            variables.description = editor.getHTML()
            console.log(variables)
            mutation.mutate(variables)
        }
    }

    const editor = useEditor({
        editable: true,
        extensions: [
          Color.configure({ types: [TextStyle.name, ListItem.name] }),
          TextStyle.configure({ types: [ListItem.name] }),
          StarterKit.configure({
            bulletList: {
              keepMarks: true,
              keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
            },
            orderedList: {
              keepMarks: true,
              keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
            },
          }),
          
        ]
      })


    return <div className="flex flex-col gap-5 w-full">
    <div className="flex gap-5">
        <button id="back-to-overview" onClick={handleClick} className="underline">Back</button>
    </div>
    
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <EntryTitleField register={register}/>
        <ErrorMessage errors={errors} name="title" />
        <EntryCharacterPickerField characters={characters} register={register}/>
        <ErrorMessage errors={errors} name="characterPicker" />
        <div className="p-1 bg-gray-100 w-full">
            <EditorMenuBar editor={editor} />
            
            <EditorContent id="entry-builder-description" editor={editor} />
        
        </div>
        <div>
            <input type="submit" className="bg-blue cursor-pointer hover:bg-blue-400 font-bold py-2 w-60 mx-auto" />
        </div>
    </form>

</div>
}