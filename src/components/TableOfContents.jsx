import { useState, useEffect } from "react";

export default function TableOfContents({rulesParsed, setAnchorChoose, rulesState}){
    const [tableOfContents, setTableOfContents] = useState([])
    const [tableState, setTableState] = useState(false)

    function slugify(str) {
        return String(str)
          .normalize('NFKD') // split accented characters into their base characters and diacritical marks
          .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
          .trim() // trim leading or trailing whitespace
          .toLowerCase() // convert to lowercase
          .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
          .replace(/\s+/g, '-') // replace spaces with hyphens
          .replace(/-+/g, '-'); // remove consecutive hyphens
    }

    
    const anchorClick = (e) => {
        e.preventDefault()
        // console.log(e.target.href)

        let itemId = e.target.href.split('#')[1];
        setAnchorChoose(itemId)
    }

    let headings = []
    
    useEffect(() => {
        for (let i = 0; i < rulesParsed.length; i++) {
            const el = rulesParsed[i];
            
            if(el.type === "h1") {
                let headingSlug = slugify(el.props.children)

                headings.push(<a href={`#${headingSlug}`} onClick={anchorClick} key={i} className="font-bold ">{el.props.children}</a>)
            } else if(el.type === "h2") {
                let headingSlug = slugify(el.props.children)
               
                headings.push(<a href={`#${headingSlug}`} key={i} onClick={anchorClick} className="ml-5 font-bold">{el.props.children}</a>)
            } else if(el.type === "h3") {
                let headingSlug = slugify(el.props.children)
                
                headings.push(<a href={`#${headingSlug}`} key={i} onClick={anchorClick} className="ml-10">{el.props.children}</a>)
            }
        }  
        setTableOfContents(headings)
    }, [rulesParsed])

    return <div className={`absolute bg-gColorOne text-white toc-wrapper z-10 transition-translate duration-500 bottom-0 transform ${tableState ? "translate-y-full" : "translate-y-0"} right-4 ${rulesState ? "block" : "hidden"}`}>
        <div className="bg-gColorOne -bottom-14 absolute p-2 flex items-center right-10">
            <button onClick={() => setTableState(!tableState)}>
                <svg className="text-white w-10 h-10" viewBox="0 0 100 70" fill="currentColor">
                    <rect width="100" height="10"></rect>
                    <rect y="30" width="100" height="10"></rect>
                    <rect y="60" width="100" height="10"></rect>
                </svg>
            </button>
        </div>
        <div className="flex flex-col gap-2 toc-inner overflow-y-scroll hide-scrollbar p-10 h-full">
            {tableOfContents}
        </div>
    </div>
}