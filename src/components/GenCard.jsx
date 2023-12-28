import parse from "html-react-parser"

export default function GenCard({ cardData }) {
    let title = cardData.title

    //  encounter data
    let rarity = cardData.rarity
    let rarityParsed = null
    let description = cardData.textArea01
    let hitPoints = cardData.hitPoints

    // fixture data
    let fixtureLevel = cardData.fixtureLevel
    let fixtureLevelOne = cardData.textArea02
    let fixtureLevelTwo = cardData.textArea03
    let fixtureLevelThree = cardData.textArea04
    let fixtureLevelFour = cardData.textArea05
    let fixtureLevelFive = cardData.textArea06
    
    let cardBg = null
    if(rarity && parseInt(rarity) === 1){
        rarityParsed = "blue"
        cardBg = "bg-sky-400"
    }else if(rarity && parseInt(rarity) === 2) {
        rarityParsed = "purple"
        cardBg = "bg-violet-400"
    }else if(rarity && parseInt(rarity) === 3) {
        rarityParsed = "red"
        cardBg = "bg-red-400"
    }

    
    return <div className={`gen-card ${ cardBg ? cardBg : "bg-gray-100"} rounded-3xl overflow-hidden p-5 flex flex-col gap-5 text-sm `}>
        { rarityParsed ? <p className="text-sm">Rarity: {rarityParsed}</p> : null }
        { fixtureLevel ? <p className="text-sm">Level: {fixtureLevel}</p> : null }
        { title ? <h5 className="font-bold">{title}</h5> : null }
        <div className="flex flex-col gap-2">
        { hitPoints ? <p className="text-sm">HP: {hitPoints}</p> : null }
        { description ? parse(description) : null}
        { fixtureLevelOne ? <div><p className="font-bold">Level One</p>{parse(fixtureLevelOne)}</div> : null }
        { fixtureLevelTwo ? <div><p className="font-bold pt-2 border-t border-black">Level Two</p>{parse(fixtureLevelTwo)}</div> : null }
        { fixtureLevelThree ? <div><p className="font-bold pt-2 border-t border-black">Level Three</p>{parse(fixtureLevelThree)}</div> : null }
        { fixtureLevelFour ? <div><p className="font-bold pt-2 border-t border-black">Level Four</p>{parse(fixtureLevelFour)}</div> : null }
        { fixtureLevelFive ? <div><p className="font-bold pt-2 border-t border-black">Level Five</p>{parse(fixtureLevelFive)}</div> : null }
        </div>
        
    </div>
}