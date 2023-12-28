import parse from "html-react-parser"

export default function GenCard({ cardData }) {
    let title = cardData.title

    console.log(cardData)

    //  encounter data
    let rarity = cardData.rarity
    let rarityParsed = null
    let description = cardData.textArea01
    let hitPoints = cardData.hitPoints

    // fixture data
    let fixtureLevel = cardData.fixtureLevel
    
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
        <div>
        { hitPoints ? <p className="text-sm">HP: {hitPoints}</p> : null }
        { description ? parse(description) : null}
        </div>
        
    </div>
}