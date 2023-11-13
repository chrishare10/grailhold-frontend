import { useRef, useState } from "react"
import { useNavStore, useProfileStore, useRulesStore, useAboutStore } from "../stores/MainStore";
import CloseBtn from "./CloseBtn";


export default function Nav() {

    const navState = useNavStore(state => state.navState)
    const updateNavState = useNavStore(state => state.updateNavState)
    const updateProfileState = useProfileStore(state => state.updateProfileState)
    const updateRulesPanelState = useRulesStore(state => state.updateRulesPanelState)
    const updateAboutState = useAboutStore(state => state.updateAboutState)
    

    const nav = useRef()

    function handleNavClick(e){
        if(e.target.id === "profile-btn"){
            updateProfileState(true)
            updateNavState(false)
        } else if(e.target.id === "rules-btn"){
            updateRulesPanelState(true)
            updateNavState(false)
        } else if(e.target.id === "about-btn") {
            updateAboutState(true)
            updateNavState(false)
        }
    }

    function handleClose() {
        updateNavState(false)
    }

    return <div id="nav-wrapper" ref={nav} className={`absolute left-0 bottom-0 z-30 w-full h-20 ${navState ? "panel-active" : ""}`}>
        <div className="bg-white flex flex-row justify-center h-full relative">
            <div className={`text-right absolute transition-all duration-500 ${navState ? "-top-10" : "top-0"}`}>
                
                <CloseBtn onClick={handleClose} color="text-white" id="close-btn" />
                
            </div>
            <div className=" flex flex-row gap-5 text-black p-3 items-center justify-center uppercase tracking-wide text-md font-bold ">
                <button id="profile-btn" onClick={handleNavClick}>Profile</button>
                <button id="rules-btn" onClick={handleNavClick}>Rules</button>
                <button id="about-btn" onClick={handleNavClick}>About</button>
            </div>
            
        </div>
    </div>
    
}