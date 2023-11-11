
import { useHexStore } from "../stores/MainStore"
import CommentsContainer from "./CommentsContainer"
import EntryEditor from "./EntryEditor"
import gql from "graphql-tag"
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'


let GET_COMMENTS = gql`
   query GetComments($ownerId: [QueryArgument]){
    comments (ownerId: $ownerId, orderBy: "commentDate DESC", limit: 35) {
        commentDate @formatDateTime (format: "M/d/yy h:m")
        name
        email
        comment
        id
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


export default function EntryContainer({entry, userId, email, username}) {
   
    const updateDetailsPage = useHexStore(state => state.updateDetailsPage)
    const commentState = useHexStore(state => state.commentState)
    
    let crew = []
    let crewParagraph
    let character = false

    let entryTitle = entry[0].title
    let entryId = entry[0].id

    if(entry[0].charactersPicker){
        
        crew = entry[0].charactersPicker.map((el, index) => <span key={el.id}>{el.title}{index === entry[0].charactersPicker.length - 2 ?  ", and " : index < entry[0].charactersPicker.length - 1 ? ", " : null  }</span>)
    }
    if(entry[0].characterPicker){
        character = entry[0].characterPicker[0].title
    }

    function handleClick(e){
        if(e.target.id == "back-to-overview"){
            updateDetailsPage(1)
        }
    }

    let sectionId = parseInt(entry[0].sectionId)
    let sectionTitle = ""
    let characterSection 
   
    if(sectionId === 1) {
        if(crew.length){
            characterSection = <div className="text-sm"><p>discovered by {crew}</p></div>
        }else {
            characterSection = null
        }
        
    }else if(sectionId === 11) {
        if(character){
            characterSection = <div className="flex flex-wrap gap-1 text-sm">built by {character}</div>
        }else {
            characterSection = null
        }

    }else if(sectionId === 12){
        if(character){
            characterSection = <div className="flex flex-wrap gap-1 text-sm">spun by {character}</div>
        }else {
            characterSection = null
        }

    }


    let comments = []
    
    const { isLoading, isError, data } = useQuery({
        queryKey: ['getComments', entryId, commentState],
        queryFn: async () =>
          request({
            url: endpoint,
            document: GET_COMMENTS,
            requestHeaders: headers,
            variables: {
              "ownerId": entryId
          },
        }),
        enabled: !!entryId
        })
        if (isError) {
        console.log("could not find comments")
        }
        if(data){
            comments = data.comments
        }

        let entryDetails = entry[0].textArea01

    return <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5">
            <button id="back-to-overview" onClick={handleClick} className="underline">Back</button>
        </div>
        <h1 className="font-base text-4xl">{entryTitle}</h1>

        {characterSection}
    
        <EntryEditor entry={entry} entryDetails={entryDetails}/>

        <CommentsContainer entryId={entryId} comments={comments} userId={userId} username={username} email={email} />

    </div>
}