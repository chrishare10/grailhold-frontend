import { useQueryClient } from '@tanstack/react-query'
import LoginUser from "../fetch/LoginUser"
import RegisterUser from "../fetch/RegisterUser";
import GetCurrentUser from "../fetch/GetCurrentUser"
import GetCharacters from "../fetch/GetCharacters";
import GetCharacter from "../fetch/GetCharacter";
import { useEffect } from "react"
import { useRegisterStore, useLoginStore, useUserStore, useCharacterStore} from "../stores/MainStore";
import ProfilePanel from "./ProfilePanel";
import RulesPanel from "./RulesPanel";
import DetailsPanel from "./DetailsPanel";


export default function Panels(){

    const updateUser = useUserStore(state => state.updateUser)
    const reloadState = useUserStore(state => state.reloadState)
    const updateLogoutState = useUserStore(state => state.updateLogoutState)
    const loginState = useLoginStore(state => state.loginState)
    const registerState = useRegisterStore(state => state.registerState)
    const character = useCharacterStore(state => state)
    const queryClient = useQueryClient()

    let userId = null
    let username = null
    let email = null
    let name = null 
    let userGM = false 
    let characters = []
    let queryKey = null
    let userObject = {}
    let userGrails = []

    let jwtToken = false 
    if(sessionStorage.getItem("jwtToken")) {
        jwtToken = sessionStorage.getItem("jwtToken");
        
    }

    let characterSelection = {}

    let loginData = LoginUser(loginState)
 
    if(loginData){
        sessionStorage.setItem("jwtToken", loginData.authenticate.jwt);
        sessionStorage.setItem("refreshToken", loginData.authenticate.refreshToken);

        console.log(loginData.authenticate.jwt)
    
        username = loginData.authenticate.user.username
        email = loginData.authenticate.user.email
        name = loginData.authenticate.user.name
        userId = loginData.authenticate.user.id
        userGM = loginData.authenticate.user.gameMasterSwitch
        userGrails = loginData.authenticate.user.grailsPicker
        queryKey = "loginUser"
        jwtToken = loginData.authenticate.jwt
    }

    
    let registerData = RegisterUser(registerState)
    if(registerData){
        // dont set until fable is validated
        // sessionStorage.setItem("jwtToken", registerData.register.jwt);
        // updateUserState(true)
    }   

    let currentUser = GetCurrentUser(jwtToken)
    if(currentUser) {

        username = currentUser.viewer.username
        email = currentUser.viewer.email
        name = currentUser.viewer.name
        userId = currentUser.viewer.id
        userGM = currentUser.viewer.gameMasterSwitch
        userGrails = currentUser.viewer.grailsPicker
        queryKey = "currentUser"
       
        userObject = {
            username: username,
            name: name,
            userId: userId,
            userGM: userGM
        } 
    }

    useEffect(() => {
        updateUser(userObject)
    }, [userObject])
    
    
    let currentCharacters = {
        userId: userId,
        reloadState: reloadState
    }

    let currentUserCharacters = GetCharacters(currentCharacters)
  
    if(currentUserCharacters){
        characters = currentUserCharacters.entries
    }

    

    let currentCharacter = GetCharacter(character.characterId)

    if(currentCharacter){
        characterSelection = currentCharacter.entries[0]
    }

    return<>
    <DetailsPanel characters={characters} userId={userId} userGrails={userGrails} email={email} username={username}/>
    <RulesPanel />
    <ProfilePanel userId={userId} email={email} loginData={loginData} currentUser={currentUser} username={username} name={name} characters={characters} userGrails={userGrails} characterSelection={characterSelection} character={character} />
    </>
}