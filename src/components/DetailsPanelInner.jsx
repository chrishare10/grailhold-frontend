import { useHexStore, useEntryStore, useProfileStore, useRulesStore, useNavStore} from "../stores/MainStore"
import parse from 'html-react-parser'; 

export default function DetailsPanelInner({hexData, setBuildId, userId, userGrails}) {

    const entriesContainerState = useHexStore(state => state.entriesContainerState)
    const updateEntriesContainerState = useHexStore(state => state.updateEntriesContainerState)
    const updateDetailState = useHexStore(state => state.updateDetailsState)
    const updateDetailsPage = useHexStore(state => state.updateDetailsPage)
    const updateProfileState = useProfileStore(state => state.updateProfileState)
    const updateEntryState = useEntryStore(state => state.updateEntryState)
    const updateRulesPanelState = useRulesStore(state => state.updateRulesPanelState)
    const updateNavState = useNavStore(state => state.updateNavState)
    

    let panelHexTitle
    let panelHexDescription
    let fixtureArray
    let entryList
    let draftEntryList
    let addBtn

    let fixtureList = []
    if(hexData[1].data){
        
        fixtureList = hexData[1].data.entries.map(fixture => <div key={fixture.id}><button className="entry bg-white rounded-lg p-3 flex-none text-base text-xl text-black text-left" id={fixture.id} onClick={handleClick}>{fixture.title}</button></div>)
    } 

    let approvedFabricationList = []
    let draftFabricationList = []
    if(hexData[2].data){
        for (let i = 0; i < hexData[2].data.entries.length; i++) {
            const fabrication = hexData[2].data.entries[i];
            let parsedAuthorId = parseInt(fabrication.authorId)
            
            if(fabrication.approvedEntry){
                approvedFabricationList.push(<button key={fabrication.id} className="entry bg-white rounded-lg w-full p-5 text-base text-xl text-black text-left flex flex-wrap md:items-center justify-between" id={fabrication.id} onClick={handleClick}>{fabrication.title}<span className="text-sm">built by {fabrication.characterPicker[0] ? fabrication.characterPicker[0].title : "unknown"}</span></button>)
            }else if(userId == parsedAuthorId){
                draftFabricationList.push(<button key={fabrication.id} className="entry bg-white rounded-lg w-full p-5 text-base text-xl text-black text-left flex flex-wrap md:items-center justify-between" id={fabrication.id} onClick={handleClick}>{fabrication.title}<span className="text-sm">built by {fabrication.characterPicker[0] ? fabrication.characterPicker[0].title : "unknown"}</span></button>)   
            }
        }
    } 

    let approvedFableList = []
    let draftFableList = []
    if(hexData[3].data){
        for (let i = 0; i < hexData[3].data.entries.length; i++) {
            const fable = hexData[3].data.entries[i];
            let parsedAuthorId = parseInt(fable.authorId)
            
            if(fable.approvedEntry){
                approvedFableList.push(<button key={fable.id} className="entry bg-white rounded-lg w-full p-5 text-base text-xl text-black text-left flex flex-wrap md:items-center justify-between" id={fable.id} onClick={handleClick}>{fable.title}<span className="text-sm">spun by {fable.characterPicker[0] ? fable.characterPicker[0].title : "unknown"}</span></button>)
            }else if(userId == parsedAuthorId){
                draftFableList.push(<button key={fable.id} className="entry bg-white rounded-lg w-full p-5 text-base text-xl text-black text-left flex flex-wrap md:items-center justify-between" id={fable.id} onClick={handleClick}>{fable.title}<span className="text-sm">spun by {fable.characterPicker[0] ? fable.characterPicker[0].title : "unknown"}</span></button>)   
            }
        }
    } 


    if(hexData[1].data) {
        if(hexData[1].data.entries) {

            fixtureArray = hexData[1].data.entries
        
            let panelHexContent = []
            if(hexData[0].data){
                panelHexContent = hexData[0].data.entries
                panelHexTitle = <h1 className="text-3xl md:text-4xl xl:text-5xl">{panelHexContent[0].title}</h1>
            }
            
            if(panelHexContent.length && panelHexContent[0].textArea01) {
                panelHexDescription = parse(panelHexContent[0].textArea01)
            } else {
                panelHexDescription = null
            }
        
        }
    }

    let entryListWrapperClasses
    if(entriesContainerState === 12){
        entryList = approvedFableList
        draftEntryList = draftFableList
        entryListWrapperClasses = 'flex flex-col gap-3 overflow-y-scroll hide-scrollbar h-full p-5'
        if(userId){
            addBtn = <button onClick={handleClick} id="add-fable" className="text-blue-500 py-2">Add Fable</button>
        }else {
            addBtn = <button onClick={handleClick} id="login-btn" className="text-blue-500 py-2">Login to add Fable</button>
        }
        
    }else if(entriesContainerState === 1) {
        entryList = fixtureList
        entryListWrapperClasses = 'flex flex-wrap gap-3 overflow-y-scroll hide-scrollbar h-full p-5'
        addBtn = null
    } else if(entriesContainerState === 11) {
        entryList = approvedFabricationList
        draftEntryList = draftFabricationList
        entryListWrapperClasses = 'flex flex-col gap-3 overflow-y-scroll hide-scrollbar h-full p-5'
        if(userId){
            addBtn = <button onClick={handleClick} id="add-fabrication" className="text-red-500 py-2">Build Fabrication (costs 1 grail)</button>
        }else {
            addBtn = <button onClick={handleClick} id="login-btn" className="text-red-500 py-2">Login to add Fabrication</button>
        }
    }

    function handleClick(e) {
        if(e.target.classList.contains("entry")) {
            updateDetailState(true)
            updateEntryState(e.target.id)
            updateDetailsPage(2)
        }else if(e.target.id === "add-fable"){
            setBuildId(12)
            updateDetailsPage(3)
        }else if(e.target.id === "add-fixture"){
            setBuildId(1)
            updateDetailsPage(3)
        }else if(e.target.id === "add-fabrication"){
            setBuildId(11)
            updateDetailsPage(3)
        } else if(e.target.id === "login-btn"){
            updateDetailState(false)
            updateProfileState(true)
            updateRulesPanelState(false)
            updateNavState(false)
        }
    }

    function handleTabClick(e) {
        if(e.target.id === "section-" + 12){
            updateEntriesContainerState(12)
        }else if(e.target.id === "section-" + 1) {
            updateEntriesContainerState(1)
        }else if(e.target.id === "section-" + 11){
            updateEntriesContainerState(11)
        }
    }
    return <div className="w-full flex flex-col w-full">
    <div className="flex justify-between">
        <div className="flex gap-1">
            <button id="section-1" title="fixtures-tab" className="py-2 px-3  bg-blue rounded-t-md text-white" onClick={handleTabClick}>Fixtures ({fixtureList.length})</button>
            <button id="section-12" title="fables-tab" className="py-2 px-3 bg-brown-light rounded-t-md text-white" onClick={handleTabClick}>Fables ({approvedFableList.length})</button>
            <button id="section-11" title="fabrications-tab" className="py-2 px-3 bg-purple rounded-t-md text-white" onClick={handleTabClick}>Fabrications ({approvedFabricationList.length})</button>
        </div>
        <div className="hidden md:block">
            { addBtn }
        </div>
        
    </div>
    <div  className={`${entriesContainerState === 12 ? "bg-brown-light" : entriesContainerState === 1 ? "bg-blue" : entriesContainerState === 11 ? "bg-purple" : "bg-gray-200"  } flex-1 h-full`}>
        <div id="details-entry-wrapper" className={entryListWrapperClasses}>
            {draftEntryList && draftEntryList.length ? <div><p className="text-white text-sm">Awaiting approval:</p><div className={`opacity-50 ${entryListWrapperClasses}`}>{draftEntryList}</div></div> : null}
            {entryList}
        </div>
    </div>
    <div className="block md:hidden">
        { addBtn }
    </div>
</div>
}