export default function CharacterName({register}) {

    return<div>
        <input className="p-2 text-black font-bold text-3xl bg-white w-full" placeholder="Name your adventurer" {...register('title', { required: true})} />
    </div>
}