import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import FormNotif from "./FormNotif"
import UserInfo from "./UserInfo"
import { useProfileStore, useRegisterStore, useLoginStore, useUserStore } from "../stores/MainStore"

export default function ProfilePanelContent({loginError, loginFetching, registerData}) {

    
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

    let registerSection

    // if(registerData.isError){
    //     registerSection = <div><RegisterForm /><p>{registerData.error.response.errors[0].message}</p><button id="login-btn" className=" underline text-sm" onClick={handleClick}>Login to account</button></div>
    // }else if()
    return <div className="h-full">
        
        <div className="h-full w-full flex flex-col justify-center">
        
            <div className="flex flex-col items-center justify-center">
                
                <div className={`${loginPanelState ? "block" : "hidden"} flex flex-col gap-5 w-full`}>
                    <LoginForm loginFetching={loginFetching}/>
                    <button id="register-btn" className="underline text-sm" onClick={handleClick}>Create an account</button>
                    <p ><span className="text-sm">This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" className="underline" target="_blank">Privacy Policy</a> and <a href="https://policies.google.com/terms" className="underline" target="_blank">Terms of Service</a> apply.
                    </span></p>
                    {loginError ? <FormNotif loginError={loginError}/> : null}
                </div>
                <div className={`${registerPanelState ? "block" : "hidden"} flex flex-col gap-5 w-full`}>
                    <RegisterForm registerData={registerData}/>
                    {registerData.isError ? <p className="text-gColorOne">{registerData.error.response.errors[0].message}</p> : null}
                    <button id="login-btn" className=" underline text-sm" onClick={handleClick}>Login to account</button>
                </div>

                
            </div>
        </div>
    </div>

   
}