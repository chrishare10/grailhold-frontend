
import { useNavStore } from "../stores/MainStore";

export default function NavButton() {

    const navState = useNavStore(state => state.navState)
    const updateNavState = useNavStore(state => state.updateNavState)

    const handleClick = () => {
        updateNavState()
    }

    return <div className="absolute z-10 bottom-5">
        <button onClick={handleClick} className="rounded-full overflow-hidden w-10 h-10 border-4 border-gColorOne group">
            <div className="rounded-full w-full h-full bg-gColorOne transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"></div>
        </button>
    </div>
}