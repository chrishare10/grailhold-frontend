import { useRef} from "react"
import UserInfo from "./UserInfo"
import ProfilePanelContent from "./ProfilePanelContent"
import { useProfileStore, useLoginStore, useUserStore} from "../stores/MainStore"
import CharacterBuilderContainer from "./CharacterBuilderContainer";
import CharacterContainer from "./CharacterContainer";
import CharactersListContainer from "./CharactersListContainer";
import CloseBtn from "./CloseBtn";
import GrailListContainer from "./GrailListContainer";


// function useForceUpdate(){
//     const [value, setValue] = useState(0); 
//     return () => setValue(value => value + 1); 
// }

export default function ProfilePanel({userId, registerData, loginError, loginFetching, loginData, currentUser, username, name, characters, characterSelection, character, userGrails}){

    const updateProfileState = useProfileStore(state => state.updateProfileState)
    const profileState = useProfileStore(state => state.profileState) 
    const profPage = useProfileStore(state => state.profPage)
    const logoutState = useUserStore(state => state.logoutState)
    const updateLoginPanelState = useLoginStore(state => state.updateLoginPanelState)

    let logout = false
   

    const profilePanel = useRef()

    function handleClick(e) {
        if(e.target.id == "logoutBtn"){
            sessionStorage.removeItem("jwtToken");
            sessionStorage.removeItem("refreshToken");
            updateLoginPanelState(true)
            window.location.reload(false);
        }
    }

    function handleClose() {
        updateProfileState(false)
    }

    let selectedId = null
    if(characterSelection){
        selectedId = characterSelection.id
    }
   

    return <div id="profile-panel-wrapper" ref={profilePanel} className={`absolute left-0 top-0 z-20 h-full w-96 gap-10 bg-white px-10 py-10 flex flex-col hide-scrollbar overflow-y-scroll ${profileState ? "panel-active" : ""}`}>
        <div className="flex justify-end">
            <CloseBtn onClick={handleClose} color="text-black" id="profile-close" />
        </div>
        <div className={`${profPage === 1 ? "" : "hidden"} flex flex-col`}>
            <div className="flex flex-col gap-10">
            {loginData || currentUser && !character.id && !logoutState ? <UserInfo username={username} name={name} /> : null }
            {!loginData && !currentUser && !character.id || logoutState ? <ProfilePanelContent registerData={registerData} loginError={loginError} loginFetching={loginFetching} /> : null }
            {loginData || currentUser && !character.id && !logoutState ? <CharactersListContainer characters={characters} /> : null }
            {loginData || currentUser && !character.id && !logoutState ? <GrailListContainer userGrails={userGrails} /> : null }
            { loginData || currentUser ? <div className="flex justify-center w-full "><button id="logoutBtn" onClick={handleClick} className="text-sm">logout</button></div> : null}
            </div>
        </div>
        <div className={`${profPage === 2 ? "" : "hidden"}`}>
            <CharacterBuilderContainer userId={userId} />
        </div>
        <div className={`${profPage === 3 ? "" : "hidden"}`}>
            { selectedId ? <CharacterContainer character={characterSelection} /> : null }
        </div>
    </div>
   
}

