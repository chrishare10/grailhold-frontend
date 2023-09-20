import Hexes from "./Hexes";

export default function Map() {
    

    return <>
        
        <Hexes />
        <div id="map-container" className="absolute flex justify-center items-center" >   
            <img className="h-full" src="./assets/static/Grailhold-map.svg" />
        </div>
        
    </>
}