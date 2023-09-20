
export default function GrailListContainer({userGrails}) {

 
    let grailList = []

    for (let i = 0; i < userGrails.length; i++) {
        const grail = userGrails[i];
        grailList.push(<div key={grail.id} id={grail.id} className="p-3 bg-gray-500 text-white rounded-lg text-sm text-left w-full">{grail.title}</div>)
    }


    
    return <div className="flex flex-col gap-2">
    <div className="flex flex-wrap justify-between gap-2">
        <h2 className="font-bold">Grails</h2>
        <p>count: {userGrails.length}</p>
    </div>
    <div className="p-5 bg-gray-200 flex flex-wrap gap-2 max-h-60 overflow-y-scroll text-left">
        {userGrails.length ? grailList : <p>No grails recovered</p>}  
    </div>
    </div>
}