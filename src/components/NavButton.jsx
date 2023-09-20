
import { useNavStore } from "../stores/MainStore";

export default function NavButton() {

    const navState = useNavStore(state => state.navState)
    const updateNavState = useNavStore(state => state.updateNavState)

    const handleClick = () => {
        updateNavState()
    }

    return <div className="absolute z-10">
        <button onClick={handleClick} className="rounded-full bg-white overflow-hidden w-10 h-10 m-6 border-2 border-gray-300"></button>
    </div>
}