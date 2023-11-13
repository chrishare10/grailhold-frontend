import { useEffect, useRef, useState } from "react"  
import GetHex from "../fetch/GetHex";
import GetEntry from "../fetch/GetEntry";
import EntryContainer from "./EntryContainer";
import { useHexStore, useEntryStore } from "../stores/MainStore"
import EntryBuilder from "./EntryBuilder";
import DetailsPanelInner from "./DetailsPanelInner";
import CloseBtn from "./CloseBtn";



export default function DetailsPanel({characters, userId, email, username, userGrails}) {

    const hexState = useHexStore(state => state.hex)
    const detailsPanelState = useHexStore(state => state.detailsPanelState)
    const detailsPage = useHexStore(state => state.detailsPage)
    const updateDetailState = useHexStore(state => state.updateDetailsState)
    const updateDetailsPage = useHexStore(state => state.updateDetailsPage)
    const entryState = useEntryStore(state => state.entryState)

    const [entrySelection, setEntrySelection] = useState(null)

    const [buildId, setBuildId] = useState(null)

    let hexData = GetHex(hexState)
    
    const detailsPanel = useRef()

    function handleClose() {
        updateDetailState(false)
        updateDetailsPage(1)
    }


 
    let entryData = GetEntry(entryState)

    useEffect(() => {
        if(entryData){
            setEntrySelection(entryData.entries)
        }
    }, [entryData])
    
    
    
    
    return<div id="details-panel-wrapper" ref={detailsPanel} className={`absolute left-0 bottom-0 z-20 w-full px-5 md:px-10 xl:px-20  ${detailsPanelState ? "panel-active" : ""}`}>
        
        
        <div id="details-container" className="bg-white rounded-t-2xl h-full px-5 md:px-10 xl:px-20 pt-10 pb-10 md:pb-20 flex flex-col gap-3 text-black overflow-y-scroll hide-scrollbar">
            <div className="text-right">
            
                <CloseBtn onClick={handleClose} color="text-black" id="close-btn" />
                
            </div>
            <div className={`${detailsPage === 1 ? "" : "hidden"} flex flex-col lg:flex-row gap-5 lg:gap-5`}>                
                <DetailsPanelInner hexData={hexData} setBuildId={setBuildId} userId={userId} userGrails={userGrails} />
            </div>
            <div className={`${detailsPage === 2 ? "" : "hidden"} flex flex-col lg:flex-row gap-5 lg:gap-5`}>
                { entrySelection ? <EntryContainer entry={entrySelection} userId={userId} username={username} email={email} characters={characters} /> : null }
            </div>
            <div className={`${detailsPage === 3 ? "" : "hidden"} flex flex-col lg:flex-row gap-5 lg:gap-5`}>
                <EntryBuilder buildId={buildId} hexState={hexState} characters={characters}/>
            </div>
        </div>
       
    </div>
    
}