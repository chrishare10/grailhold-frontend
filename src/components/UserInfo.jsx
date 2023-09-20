import { useUserStore } from "../stores/MainStore"

export default function UserInfo({username, name}) {

    return <div className="flex flex-col gap-10">
        <div className="flex flex-col text-center">
            <p className="text-3xl">{name ? name : "no name"}</p>
            <p className="text-sm">{username ? username : "no username"}</p>
        </div>
    </div>
}