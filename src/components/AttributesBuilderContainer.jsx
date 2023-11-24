import { Controller } from "react-hook-form";
import SliderComponent from "./SliderComponent";
import AttributesAvailableIndicator from "./AttributesAvailableIndicator";



export default function AttributesBuilderContainer({register, control, limit, getValues, currentAttributeCount, majorAtt, minorAtt}) {
    let currentCount = currentAttributeCount
    let limitReached = false
    let availableCount = 0
    if(currentCount >= limit){
        limitReached = true
    }else{
        availableCount = limit - currentCount
    }

    
    return <>
    {control ? <div className="flex flex-col gap-5">
        {availableCount != 0 ? <AttributesAvailableIndicator availableCount={availableCount} /> : null}
        {availableCount != 0 ? <p className="text-sm">Attributes max out at three during character creation</p> : null}
        <div id="prowess-row">
            <h2 className="font-bold">Prowess</h2>
            <div className="flex items-center gap-2" id="athletics-row">
                <div>
                    <p>Athletics</p>
                </div>
                <div className="p-1 grow">
                    <Controller
                    control={control}
                    name="attributes.athletics"
                    defaultValue={0}
                    render={({ field: { value,  onChange, name } }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 3}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        />
                    )}
                    />
                    
            </div>
            </div>
            <div className="flex gap-2 items-center" id="stealth-row">
                <div>
                    <p>Stealth</p>
                </div>
                <div className="p-1 grow">
                    <Controller
                    control={control}
                    name="attributes.stealth"
                    defaultValue={0}
                    render={({ field: { value, onChange, name } }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 3}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        />
                    )}
                    />
                </div>
            </div>
            <div className="flex gap-2 items-center" id="aiming-row">
                <div>
                    <p>Aiming</p>
                </div>
                <div className="p-1 grow">
                    <Controller
                    control={control}
                    name="attributes.aiming"
                    defaultValue={0}
                    render={({ field: { value, onChange, name } }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 3}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        />
                    )}
                    />
                </div>
            </div>
            <div className="flex gap-2 items-center" id="striking-row">
                <div>
                    <p>Striking</p>
                </div>
                <div className="p-1 grow">
                    <Controller
                    control={control}
                    name="attributes.striking"
                    defaultValue={0}
                    render={({ field: { value, onChange, name } }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 3}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        />
                    )}
                    />
                </div>
            </div>
        </div>
        <div id="intellect-row">
            <h2 className="font-bold">Intellect</h2>
            <div className="flex gap-2 items-center" id="lore-row">
                <div>
                    <p>Lore</p>
                </div>
                <div className="p-1 grow">
                    <Controller
                    control={control}
                    name="attributes.lore"
                    defaultValue={0}
                    render={({ field: { value, onChange, name} }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 3}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        />
                    )}
                    />
                </div>
            </div>
            <div className="flex gap-2 items-center" id="tinker-row">
                <div>
                    <p>Tinker</p>
                </div>
                <div className="p-1 grow">
                    <Controller
                    control={control}
                    name="attributes.tinker"
                    defaultValue={0}
                    render={({ field: { value, onChange, name } }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 3}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        />
                    )}
                    />
                </div>
            </div>
            <div className="flex gap-2 items-center" id="nature-row">
                <div>
                    <p>Nature</p>
                </div>
                <div className="p-1 grow">
                    <Controller
                    control={control}
                    name="attributes.nature"
                    defaultValue={0}
                    render={({ field: { value, onChange, name } }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 3}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        />
                    )}
                    />
                </div>
            </div>
            <div className="flex gap-2 items-center" id="healing-row">
                <div>
                    <p>Healing</p>
                </div>
                <div className="p-1 grow">
                    <Controller
                    control={control}
                    name="attributes.healing"
                    defaultValue={0}
                    render={({ field: { value, onChange, name } }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 3}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        />
                    )}
                    />
                </div>
            </div>
        </div>
        <div id="cunning-row">
            <h2 className="font-bold">Cunning</h2>
            <div className="flex gap-2 items-center" id="insight-row">
                <div>
                    <p>Insight</p>
                </div>
                <div className="p-1 grow">
                    <Controller
                    control={control}
                    name="attributes.insight"
                    defaultValue={0}
                    render={({ field: { value, onChange, name } }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 3}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        />
                    )}
                    />
                </div>
            </div>
            <div className="flex gap-2 items-center" id="perception-row">
                <div>
                    <p>Perception</p>
                </div>
                <div className="p-1 grow">
                    <Controller
                    control={control}
                    name="attributes.perception"
                    defaultValue={0}
                    render={({ field: { value, onChange, name } }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 3}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        />
                    )}
                    />
                </div>
            </div>
            <div className="flex gap-2 items-center" id="communication-row">
                <div>
                    <p>Communication</p>
                </div>
                <div className="p-1 grow">
                    <Controller
                    control={control}
                    name="attributes.communication"
                    defaultValue={0}
                    render={({ field: { value, onChange, name } }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 3}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        />
                    )}
                    />
                </div>
            </div>
            <div className="flex gap-2 items-center" id="performance-row">
                <div>
                    <p>Performance</p>
                </div>
                <div className="p-1 grow">
                    <Controller
                    control={control}
                    name="attributes.performance"
                    defaultValue={0}
                    render={({ field: { value, onChange, name} }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 3}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        />
                    )}
                    />
                </div>
            </div>
        </div>
    </div>
    :
    null
    }
</>
}