import GenCard from "./GenCard"
import GetFixture from "../fetch/GetFixture";
import { useFixtureStore} from "../stores/MainStore"

export default function FixtureGeneratorContainer() {
    const fixtureState = useFixtureStore(state => state.fixtureState)
    let fixtureData = GetFixture(fixtureState)

    return <div className="w-full">
    <div className="bg-gray-600 text-white w-full justify-center">
        <h3 className="text-base font-bold px-5 py-2">Fixture Generator</h3>
    </div>
    <div className="bg-gray-200 flex flex-col md:flex-row gap-10 p-5 justify-center">
        {fixtureData.map((fixture) => (
        <GenCard key={fixture.id} element={fixture.title}/>
        ))}
    </div>
</div>
}