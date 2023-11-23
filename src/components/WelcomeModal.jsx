import { useWelcomeModalStore } from "../stores/MainStore"
import React from "react"
import CloseBtn from "./CloseBtn";

export default function WelcomeModal() {

   
    
   
    let welcomeModalState = useWelcomeModalStore(state => state.welcomeModalState)
    let updateWelcomeModalState = useWelcomeModalStore(state => state.updateWelcomeModalState)

    return <>
    {!welcomeModalState ? (
      <>
        <div className="fixed w-full h-full flex justify-center items-center z-50 z-20 pointer-events-none">
        
            <div id="welcome-modal-container" className="hide-scrollbar max-h-screenh p-10 overflow-y-scroll pointer-events-auto text-center">
                <div className="rounded-3xl bg-white p-5 md:p-10 xl:p-20 flex flex-col gap-4">
                    <div className="flex justify-end">
                      <CloseBtn onClick={() => { updateWelcomeModalState(true)}} color="text-black" id="close-btn" />
                    </div>
                    <h1>Welcome To Grailhold Alpha!</h1>
                    <p>Create an account to build a character and to recieve notifications of upcoming excursion play tests!</p>
                </div>  
            </div>
            
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={() => updateWelcomeModalState(true)}></div>
      </>
    ) : null}
  </>
}