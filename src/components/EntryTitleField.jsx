export default function EntryTitleField({register}) {

    return<div>
        <input className="p-2 w-full text-black text-3xl bg-white" placeholder="Title your entry" {...register('title', { required: "Please enter a title"})} />
    </div>
}