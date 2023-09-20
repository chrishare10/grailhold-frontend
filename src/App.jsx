
import Map from "./components/Map";
import { useRef, useEffect, useState } from "react";
import NavButton from "./components/NavButton";
import Nav from "./components/Nav";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useSpring, animated } from '@react-spring/web'
import { pinchAction, createUseGesture } from '@use-gesture/react'
import AboutWrapper from "./components/AboutWrapper";
import Panels from "./components/Panels";

const useGesture = createUseGesture([pinchAction])

export default function App(){
    const pageWrapper = useRef()
    const mapWrapper = useRef()
    const mapContainer = useRef()
    const wheelOffset = useRef(1)

    const [date, setDate] = useState(new Date());
    const [percent, setPercent] = useState(1);
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 100000 )
        function cleanup() {
            clearInterval(timer)
        }
    
    });

    let currentHour = date.getHours()

    useEffect(() => {

        if(currentHour < 6 || currentHour > 18){
            setPercent(.8)
        }else if(currentHour == 6 || currentHour == 18){
            setPercent(.9)
        } else {
            setPercent(1)
        }

        console.log(percent)

    }, [currentHour])

    

    // useEffect(() => {
    //     const handler = (e) => e.preventDefault()
    //     document.addEventListener('gesturestart', handler)
    //     document.addEventListener('gesturechange', handler)
    //     document.addEventListener('gestureend', handler)
    //     return () => {
    //       document.removeEventListener('gesturestart', handler)
    //       document.removeEventListener('gesturechange', handler)
    //       document.removeEventListener('gestureend', handler)
    //     }
    //   }, [])
   
    // // let mapScale
    // // let scalePercent
    // // let panning = false
    // // let scale = 1
    // // let pointX = 0
    // // let pointY = 0
    // // let start = { x: 0, y: 0 }
    // // const speed = 0.01;

    // const [style, api] = useSpring(() => ({
    //     x: 0,
    //     y: 0,
    //     scale: 1,
    //     rotateZ: 0,
    //   }))


    // useGesture(
    //     { 
    //         onPinch:  ({ origin: [ox, oy], first, movement: [ms], offset: [s, a], memo }) => {
    //             if (first) {
    //             const { width, height, x, y } = mapWrapper.current.getBoundingClientRect()
    //             const tx = ox - (x + width / 2)
    //             const ty = oy - (y + height / 2)
    //             memo = [style.x.get(), style.y.get(), tx, ty]
    //             }
        
    //             const x = memo[0] - (ms - 1) * memo[2]
    //             const y = memo[1] - (ms - 1) * memo[3]
    //             api.start({ scale: s, rotateZ: a, x, y })
    //             return memo
    //         }
    //     },
    //     {
    //         target: mapWrapper,
    //         eventOptions: { passive: false },
    //         pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true }
    //     }
    // )

 

    


    return <div id="wrapper" className="flex justify-center items-end overflow-hidden w-screen h-screen" >
        <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_API_RECAPTCHA_SITE_KEY}>
            <AboutWrapper />

            <NavButton/>
            <div id="page-wrapper" ref={pageWrapper} className="overflow-scroll w-full h-full xl:flex items-center">
                <div id="frame" ref={mapWrapper} className="mx-auto" >
                    <animated.div ref={mapContainer} className="main mx-auto h-full" >
                        <Map />
                    </animated.div>
                </div>
            </div>
            
            <Panels />
            
            <Nav />
            
        </GoogleReCaptchaProvider>
    </div>
}