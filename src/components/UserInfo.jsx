import { useUserStore } from "../stores/MainStore"

export default function UserInfo({username, name}) {

    return <div className="flex flex-col gap-10">
        <div className="flex flex-col text-center">
            <h1 className="text-3xl">{name ? name : "no name"}</h1>
            <p className="text-sm">{username ? username : "no username"}</p>
        </div>
    </div>
}