import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState, useEffect } from 'react'
import EditorMenuBar from './EditorMenuBar'
import gql from "graphql-tag"
import request from 'graphql-request'
import { useMutation } from '@tanstack/react-query'
import { useUserStore } from "../stores/MainStore"
import parse from "html-react-parser"
import toast from 'react-hot-toast';



const endpoint = process.env.VITE_API_ENDPOINT
const headers = {
    authorization: process.env.VITE_API_AUTH,
}

export default ({entry, entryDetails}) => {

  
  let entryType
  let buildId = parseInt(entry[0].sectionId)
  if(buildId === 1){
      entryType = "fixtures"
  }else if(buildId === 12){
      entryType = "fables"
  }else if(buildId === 11){
      entryType = "fabrications"
  }

  let MUTATE_ENTRY = gql`
    mutation($id: ID, $title: String, $slug: String,  $textArea01: String){
    save_${entryType}_default_Entry (
        id: $id,
        textArea01: $textArea01,
        title: $title,
        slug: $slug
    ) {
      title
      slug
        ...on ${entryType}_default_Entry {
        textArea01
        }
    }
    }
  `

  const [editorContent, setEditorContent] = useState("");
  const userId = useUserStore(state => state.userId)  

    let author = false
    
    let entryAuthorId = entry[0].authorId
    let entryId = parseInt(entry[0].id)
    

    let userIdParsed
    if(userId) {
        userIdParsed = parseInt(userId)
    }

    if (entryAuthorId === userIdParsed) {
        author = true
    }

    // mutation
    let editorMutation = useMutation({
      mutationFn: async (variables) =>
        request({
          url: endpoint,
          document: MUTATE_ENTRY,
          requestHeaders: headers,
          variables,
      }),
      onError: (error) => {
        toast.error(`Could not update entry`, {position: 'top-center',})
      },
      onSuccess: () => {
        toast.success(`Entry updated`, {position: 'top-center',})
      }
      })

  let editor = useEditor({
    editable: author,
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
    ],
    onBlur({editor}) {
      entry[0].textArea01 = editor.getHTML()
      editorMutation.mutate(entry[0])
    }
  })
 
  useEffect(() => {
    editor?.commands.setContent(entryDetails)
  }, [editor,entryDetails])
  return (
    <div>
      {author ? <EditorMenuBar editor={editor} /> : null}
      <EditorContent editor={editor} />
    </div>
  )
}