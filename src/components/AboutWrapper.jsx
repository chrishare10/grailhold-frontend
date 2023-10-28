import { useState } from 'react'
import { useAboutStore } from "../stores/MainStore"
import parse from "html-react-parser"
import GetAbout from '../fetch/GetAbout'
import React from "react"
import CloseBtn from "./CloseBtn";

export default function AboutWrapper() {

   
    
    let aboutData = GetAbout()
    // let aboutEmbedRaw = aboutData.text01 ? aboutData.text01 : ""
    let aboutDetailsRaw = aboutData.textArea01 ? aboutData.textArea01 : ""
    // let aboutEmbedParsed = parse(aboutEmbedRaw)
    let aboutDetailsParsed = parse(aboutDetailsRaw)
    
    let aboutState = useAboutStore(state => state.aboutState)
    let updateAboutState = useAboutStore(state => state.updateAboutState)

    return <>
    {aboutState ? (
      <>
        <div className="fixed z-50 z-20 pointer-events-none">
        
            <div id="about-container" className="hide-scrollbar max-h-screen p-10 overflow-y-scroll pointer-events-auto">
                <div className="rounded-3xl bg-white p-5 md:p-10 xl:p-20 flex flex-col gap-4">
                    <div className="flex justify-end pb-5">
                      <CloseBtn onClick={() => { updateAboutState(false)}} color="text-black" id="close-btn" />
                    </div>
                    {/* <div className="mb-10 video-container">
                    {aboutEmbedParsed}
                    </div> */}
                    {aboutDetailsParsed}
                </div>  
            </div>
            
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={() => updateAboutState(false)}></div>
      </>
    ) : null}
  </>
}