
import { useRef, useEffect, useState } from "react";
import NavButton from "./components/NavButton";
import Nav from "./components/Nav";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { pinchAction, createUseGesture } from '@use-gesture/react'
import AboutWrapper from "./components/AboutWrapper";
import Panels from "./components/Panels";
import FullCanvas from "./components/FullCanvas";

const useGesture = createUseGesture([pinchAction])

export default function App(){


    const [date, setDate] = useState(new Date());
    const [oceanColor, setOceanColor] = useState('bg-blue-200');
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 100000 )
        function cleanup() {
            clearInterval(timer)
        }
    
    });

    let currentHour = date.getHours()

    useEffect(() => {

        if(currentHour < 6 || currentHour > 18){
            setOceanColor('bg-blue-900')
        }else if(currentHour == 6 || currentHour == 18){
            setOceanColor('bg-blue-800')
        } else {
            setOceanColor('bg-blue-700')
        }

      

    }, [currentHour])

    

   

    


    return <div id="wrapper" className={`flex justify-center items-end overflow-hidden w-screen h-screenh relative`} >
        <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_API_RECAPTCHA_SITE_KEY}>
            <Nav />
            <FullCanvas />
            <AboutWrapper />
            <NavButton/>
            <Panels />    
        </GoogleReCaptchaProvider>
    </div>
}