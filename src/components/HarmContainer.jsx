export default function HarmContainer({harm11, harm12, harm21, harm22, harm3, register}) {

    return <div>
        <h2 className="font-bold">Harm</h2>
    
        <div className="flex flex-col gap-3 p-3 bg-gray-200">
            
            <div>
                <p className="text-gray-800">Level One</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <input className="p-2 text-black bg-white" {...register('text01')} />
                    <input className="p-2 text-black bg-white" {...register('text02')} />
                </div>
            </div>
            <div>
                <p className="text-gray-800">Level Two</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <input className="p-2 text-black bg-white" {...register('text03')} />
                <input className="p-2 text-black bg-white" {...register('text04')} />
                </div>
            </div>
            <div>
                <p className="text-gray-800">Level Three</p>
                <div className="grid grid-cols-1 gap-2">
                <input className="p-2 text-black bg-white" {...register('text05')} />
                </div>
            </div>
            
            
        </div>
    </div>
}