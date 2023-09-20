import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import UserInfo from "./UserInfo"
import { useProfileStore, useRegisterStore, useLoginStore, useUserStore } from "../stores/MainStore"

export default function ProfilePanelContent() {

    
    const loginPanelState = useLoginStore(state => state.loginPanelState)
    const registerPanelState = useRegisterStore(state => state.registerPanelState)
    const updateLoginPanelState = useLoginStore(state => state.updateLoginPanelState)
    const updateRegisterPanelState = useRegisterStore(state => state.updateRegisterPanelState) 
    const updateLogoutState = useUserStore(state => state.updateLogoutState)
  
    const updateCharacters = useUserStore(state => state.updateCharacters)

    function handleClick(e) {
        
        if(e.target.id === "register-btn"){
            updateRegisterPanelState(true) 
            updateLoginPanelState(false)     
        }else if(e.target.id === "login-btn"){
            updateLoginPanelState(true)
            updateRegisterPanelState(false) 
            updateLogoutState(false)
        }
    }
    return <div className="h-full">
        
        <div className="h-full w-full flex flex-col justify-center">
        
            <div className="flex flex-col items-center justify-center">
                
                <div className={`${loginPanelState ? "block" : "hidden"} flex flex-col gap-5 w-full`}>
                    <LoginForm />
                    <button id="register-btn" className="underline text-sm" onClick={handleClick}>Create an account</button>
                </div>
                <div className={`${registerPanelState ? "block" : "hidden"} flex flex-col gap-5 w-full`}>
                    <RegisterForm />
                    <button id="login-btn" className=" underline text-sm" onClick={handleClick}>Login to account</button>
                </div>

                
            </div>
        </div>
    </div>

   
}