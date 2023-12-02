import FeedbackButton from "../components/FeedbackButton";
import UsersCountDisplay from "../components/UsersCountDisplay";
import SelectedHexDisplay from "./SelectedHexDisplay";

export default function TopLeftOverlayBox() {

    return <div className="absolute top-10 left-10 z-20 flex flex-col gap-2">
        <FeedbackButton />
        <UsersCountDisplay />
        <SelectedHexDisplay />
    </div>
}