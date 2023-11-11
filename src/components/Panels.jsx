import { useQueryClient } from '@tanstack/react-query'
import LoginUser from "../fetch/LoginUser"
import RegisterUser from "../fetch/RegisterUser";
import GetCurrentUser from "../fetch/GetCurrentUser"
import GetCharacters from "../fetch/GetCharacters";
import GetCharacter from "../fetch/GetCharacter";
import { useEffect } from "react"
import { useRegisterStore, useLoginStore, useUserStore, useCharacterStore } from "../stores/MainStore";
import ProfilePanel from "./ProfilePanel";
import RulesPanel from "./RulesPanel";
import DetailsPanel from "./DetailsPanel";


export default function Panels(){

    const updateUser = useUserStore(state => state.updateUser)
    const reloadState = useUserStore(state => state.reloadState)
    const updateLogoutState = useUserStore(state => state.updateLogoutState)
    const loginState = useLoginStore(state => state.loginState)
    const updateLoginState = useLoginStore(state => state.updateLoginState)
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

    
    if(loginData.data){
        sessionStorage.setItem("jwtToken", loginData.data.authenticate.jwt);
        sessionStorage.setItem("refreshToken", loginData.data.authenticate.refreshToken);
    
        username = loginData.data.authenticate.user.username
        email = loginData.data.authenticate.user.email
        name = loginData.data.authenticate.user.name
        userId = loginData.data.authenticate.user.id
        userGM = loginData.data.authenticate.user.gameMasterSwitch
        userGrails = loginData.data.authenticate.user.grailsPicker
        queryKey = "loginUser"
        jwtToken = loginData.data.authenticate.jwt
    }

    
    let registerData = RegisterUser(registerState)

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
    <ProfilePanel userId={userId} email={email} registerData={registerData} loginError={loginData.error} loginFetching={loginData.isFetching} loginData={loginData.data} currentUser={currentUser} username={username} name={name} characters={characters} userGrails={userGrails} characterSelection={characterSelection} character={character} />
    </>
}