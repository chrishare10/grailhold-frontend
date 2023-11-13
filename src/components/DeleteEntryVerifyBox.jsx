export default function DeleteEntryVerifyBox({verifyDelete}) {
    return <div>
        <p>All details will be lost, You're sure you want to delete? <button onClick={verifyDelete} className="text-gColorOne cursor-pointer underline">Confirm Delete</button></p>
    </div>
}