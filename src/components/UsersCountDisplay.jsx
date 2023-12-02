import GetUsersCount from "../fetch/GetUsersCount";

export default function UsersCountDisplay(){

    let usersCount = GetUsersCount()

    return <>
        {usersCount ?
            <div className="text-white">
                <p>Adventurers Count: {usersCount}</p>
            </div>
        : null }
    </>
    
}