import { useRef, useState, useEffect } from "react"
import parse from "html-react-parser"
import GetRules from "../fetch/GetRules";
import { useRulesStore, useUserStore } from "../stores/MainStore"
import GeneratorPanel from "./GeneratorPanel";
import GeneratorButtons from "./GeneratorButtons";
import DiceRollerPanel from "./DiceRollerPanel";
import CloseBtn from "./CloseBtn";
import TableOfContents from "./TableOfContents";

export default function RulesPanel(){
    const userGM = useUserStore(state => state.userGM)
    const rulesPanelState = useRulesStore(state => state.rulesPanelState)
    const rulesState = useRulesStore(state => state.rulesState)
    const generatorState = useRulesStore(state => state.generatorState)
    const dicePanelState = useRulesStore(state => state.dicePanelState)
    const updateRulesPanelState = useRulesStore(state => state.updateRulesPanelState)
    const updateGeneratorState = useRulesStore(state => state.updateGeneratorState)
    const updateRulesState = useRulesStore(state => state.updateRulesState)
    const updateDicePanelState = useRulesStore(state => state.updateDicePanelState)
    
    const [rulesParsedState, setRulesParsedState] = useState([])
    const [anchorChoose, setAnchorChoose] = useState(false)
    
    

       
    let headingRefs = useRef()
    const rulesPanel = useRef()
    const rulesPanelInner = useRef()
    let rulesData = GetRules()
    let rulesParsed
    
    useEffect(() => {
        rulesParsed = parse(rulesData)
        setRulesParsedState(rulesParsed)
    }, [rulesData])

    useEffect(() => {
        if(anchorChoose){
            let targetElement = document.getElementById(anchorChoose)
            
            if(targetElement){
               
                rulesPanelInner.current.scroll({
                    top: (targetElement.offsetTop - 15),
                    behavior: "smooth"
                  });
            }
        }
    },[anchorChoose])


    function handleClick(e) {
        if(e.target.id === "generators-btn"){
            updateGeneratorState(true) 
            updateRulesState(false)  
            updateDicePanelState(false)    
        }else if(e.target.id === "rules-btn"){
            updateRulesState(true)
            updateGeneratorState(false) 
            updateDicePanelState(false) 
        }else if(e.target.id === "dice-btn"){
            updateRulesState(false)
            updateGeneratorState(false)
            updateDicePanelState(true) 
        }
        
    }

    function handleClose(){
        updateRulesPanelState(false)
    }

    return <div id="rules-panel-wrapper" ref={rulesPanel} className={`absolute right-0 top-0 z-20 h-full bg-white flex flex-col items-center ${rulesPanelState ? "panel-active" : ""}`}>
        <div className="relative w-full">
            <div className="flex flex-row gap-3 md:gap-5 px-5 md:px-10 justify-between w-full bg-gray-200 items-center relative z-20">
                <div className="flex flex-row gap-3 md:gap-5">
                    <button id="rules-btn" className={`text-xl font-bold p-3 md:p-5 ${rulesState ? "bg-white" : ""}`} onClick={handleClick}>Rules</button>
                    {userGM ? <button id="generators-btn" className={`text-xl font-bold p-3 md:p-5 ${generatorState ? "bg-white" : ""}`} onClick={handleClick}>Generators</button> : null }
                    <button id="dice-btn" className={`text-xl font-bold p-3 md:p-5 ${dicePanelState ? "bg-white" : ""}`} onClick={handleClick}>Dice</button>
                </div>
                <div>
                    <CloseBtn id="rules-close" onClick={handleClose} color="text-black" />
                </div>
               
            </div>
            <TableOfContents rulesParsed={rulesParsedState} setAnchorChoose={setAnchorChoose} rulesState={rulesState}/>
        </div>
        
        <div id="rules-panel" ref={rulesPanelInner} className={`overflow-y-scroll hide-scrollbar w-full ${rulesState ? "block" : "hidden"}`}>
            <div className="relative">  
                
                <div className="px-10 py-20 flex flex-col gap-4">
                    {rulesParsedState}
                </div>
           
            </div>
        </div>
        {userGM ? <div className={`${generatorState ? "block" : "hidden"} w-full overflow-y-scroll hide-scrollbar`}>
            <div className="px-10 py-20 flex flex-col gap-4"> 
            <GeneratorButtons />
            <GeneratorPanel />
            </div>
        </div> 
        :
        null
        }
        

        <div className={`${dicePanelState ? "block" : "hidden"} w-full`}>
            <DiceRollerPanel />
        </div>
    </div>
   
}