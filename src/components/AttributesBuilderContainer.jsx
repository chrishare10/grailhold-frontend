import { Controller } from "react-hook-form";
import SliderComponent from "./SliderComponent";
import AttributesAvailableIndicator from "./AttributesAvailableIndicator";



export default function AttributesBuilderContainer({register, control, limit, setValue, getValues, currentAttributeCount, majorAtt, minorAtt}) {
    let currentCount = currentAttributeCount
    let limitReached = false
    let availableCount = 0
    if(currentCount >= limit){
        limitReached = true
    }else{
        availableCount = limit - currentCount
    }

    return <>
    {control ? <div className="flex flex-col gap-3">
        {availableCount != 0 ? <AttributesAvailableIndicator availableCount={availableCount} /> : null}
        {availableCount != 0 ? <p className="text-sm">Attributes max out at three during character creation</p> : null}
        <div id="prowess-row">
            <h2 className="font-bold">Prowess</h2>
            <div className="flex items-center gap-3" id="athletics-row">
                <div>
                    <p>Athletics</p>
                </div>
                <div>
                    <button className={`${minorAtt === "attributes.athletics" && getValues("attributes.athletics") <= 1 ? "hidden" : majorAtt === "attributes.athletics" && getValues("attributes.athletics") <= 2 ? "hidden" : getValues("attributes.athletics") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.athletics', getValues("attributes.athletics") - 1, { shouldDirty: true })
                        }}>-</button>
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
                <div>
                    <button className={`${limitReached || getValues("attributes.athletics") >= 3 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.athletics', getValues("attributes.athletics") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
            <div className="flex gap-3 items-center" id="stealth-row">
                <div>
                    <p>Stealth</p>
                </div>
                <div>
                <button className={`${minorAtt === "attributes.stealth" && getValues("attributes.stealth") <= 1 ? "hidden" : majorAtt === "attributes.stealth" && getValues("attributes.stealth") <= 2 ? "hidden" : getValues("attributes.stealth") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.stealth', getValues("attributes.stealth") - 1, { shouldDirty: true })
                        }}>-</button>
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
                <div>
                    <button className={`${limitReached || getValues("attributes.stealth") >= 3 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.stealth', getValues("attributes.stealth") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
            <div className="flex gap-3 items-center" id="aiming-row">
                <div>
                    <p>Aiming</p>
                </div>
                <div>
                <button className={`${minorAtt === "attributes.aiming" && getValues("attributes.aiming") <= 1 ? "hidden" : majorAtt === "attributes.aiming" && getValues("attributes.aiming") <= 2 ? "hidden" : getValues("attributes.aiming") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.aiming', getValues("attributes.aiming") - 1, { shouldDirty: true })
                        }}>-</button>
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
                <div>
                    <button className={`${limitReached || getValues("attributes.aiming") >= 3 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.aiming', getValues("attributes.aiming") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
            <div className="flex gap-3 items-center" id="striking-row">
                <div>
                    <p>Striking</p>
                </div>
                <div>
                    <button className={`${minorAtt === "attributes.striking" && getValues("attributes.striking") <= 1 ? "hidden" : majorAtt === "attributes.striking" && getValues("attributes.striking") <= 2 ? "hidden" : getValues("attributes.striking") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.striking', getValues("attributes.striking") - 1, { shouldDirty: true })
                        }}>-</button>
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
                <div>
                    <button className={`${limitReached || getValues("attributes.striking") >= 3 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.striking', getValues("attributes.striking") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
        </div>
        <div id="intellect-row">
            <h2 className="font-bold">Intellect</h2>
            <div className="flex gap-3 items-center" id="lore-row">
                <div>
                    <p>Lore</p>
                </div>
                <div>
                    <button className={`${minorAtt === "attributes.lore" && getValues("attributes.lore") <= 1 ? "hidden" : majorAtt === "attributes.lore" && getValues("attributes.lore") <= 2 ? "hidden" : getValues("attributes.lore") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.lore', getValues("attributes.lore") - 1, { shouldDirty: true })
                        }}>-</button>
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
                <div>
                    <button className={`${limitReached || getValues("attributes.lore") >= 3 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.lore', getValues("attributes.lore") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
            <div className="flex gap-3 items-center" id="tinker-row">
                <div>
                    <p>Tinker</p>
                </div>
                <div>
                    <button className={`${minorAtt === "attributes.tinker" && getValues("attributes.tinker") <= 1 ? "hidden" : majorAtt === "attributes.tinker" && getValues("attributes.tinker") <= 2 ? "hidden" : getValues("attributes.tinker") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.tinker', getValues("attributes.tinker") - 1, { shouldDirty: true })
                        }}>-</button>
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
                <div>
                    <button className={`${limitReached || getValues("attributes.tinker") >= 3 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.tinker', getValues("attributes.tinker") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
            <div className="flex gap-3 items-center" id="nature-row">
                <div>
                    <p>Nature</p>
                </div>
                <div>
                    <button className={`${minorAtt === "attributes.nature" && getValues("attributes.nature") <= 1 ? "hidden" : majorAtt === "attributes.nature" && getValues("attributes.nature") <= 2 ? "hidden" : getValues("attributes.nature") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.nature', getValues("attributes.nature") - 1, { shouldDirty: true })
                        }}>-</button>
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
                <div>
                    <button className={`${limitReached || getValues("attributes.nature") >= 3 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.nature', getValues("attributes.nature") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
            <div className="flex gap-3 items-center" id="healing-row">
                <div>
                    <p>Healing</p>
                </div>
                <div>
                    <button className={`${minorAtt === "attributes.healing" && getValues("attributes.healing") <= 1 ? "hidden" : majorAtt === "attributes.healing" && getValues("attributes.healing") <= 2 ? "hidden" : getValues("attributes.healing") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.healing', getValues("attributes.healing") - 1, { shouldDirty: true })
                        }}>-</button>
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
                <div>
                    <button className={`${limitReached || getValues("attributes.healing") >= 3 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.healing', getValues("attributes.healing") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
        </div>
        <div id="cunning-row">
            <h2 className="font-bold">Cunning</h2>
            <div className="flex gap-3 items-center" id="insight-row">
                <div>
                    <p>Insight</p>
                </div>
                <div>
                    <button className={`${minorAtt === "attributes.insight" && getValues("attributes.insight") <= 1 ? "hidden" : majorAtt === "attributes.insight" && getValues("attributes.insight") <= 2 ? "hidden" : getValues("attributes.insight") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.insight', getValues("attributes.insight") - 1, { shouldDirty: true })
                        }}>-</button>
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
                <div>
                    <button className={`${limitReached || getValues("attributes.insight") >= 3 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.insight', getValues("attributes.insight") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
            <div className="flex gap-3 items-center" id="perception-row">
                <div>
                    <p>Perception</p>
                </div>
                <div>
                    <button className={`${minorAtt === "attributes.perception" && getValues("attributes.perception") <= 1 ? "hidden" : majorAtt === "attributes.perception" && getValues("attributes.perception") <= 2 ? "hidden" : getValues("attributes.perception") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.perception', getValues("attributes.perception") - 1, { shouldDirty: true })
                        }}>-</button>
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
                <div>
                    <button className={`${limitReached || getValues("attributes.perception") >= 3 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.perception', getValues("attributes.perception") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
            <div className="flex gap-3 items-center" id="communication-row">
                <div>
                    <p>Communication</p>
                </div>
                <div>
                    <button className={`${minorAtt === "attributes.communication" && getValues("attributes.communication") <= 1 ? "hidden" : majorAtt === "attributes.communication" && getValues("attributes.communication") <= 2 ? "hidden" : getValues("attributes.communication") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.communication', getValues("attributes.communication") - 1, { shouldDirty: true })
                        }}>-</button>
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
                <div>
                    <button className={`${limitReached || getValues("attributes.communication") >= 3 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.communication', getValues("attributes.communication") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
            <div className="flex gap-3 items-center" id="performance-row">
                <div>
                    <p>Performance</p>
                </div>
                <div>
                    <button className={`${minorAtt === "attributes.performance" && getValues("attributes.performance") <= 1 ? "hidden" : majorAtt === "attributes.performance" && getValues("attributes.performance") <= 2 ? "hidden" : getValues("attributes.performance") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.performance', getValues("attributes.performance") - 1, { shouldDirty: true })
                        }}>-</button>
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
                <div>
                    <button className={`${limitReached || getValues("attributes.performance") >= 3 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'attributes.performance', getValues("attributes.performance") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
        </div>
    </div>
    :
    null
    }
</>
}