import { Controller } from "react-hook-form";
import SliderComponent from "./SliderComponent";
import AttributesAvailableIndicator from "./AttributesAvailableIndicator";

export default function AttributesContainer({control, limit, currentAttributeCount, majorAtt, minorAtt, setValue, getValues}) {
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
        <div id="prowess-row">
            <h2 className="font-bold">Prowess</h2>
            <div className="flex items-center gap-3" id="athletics-row">
                <div>
                    <p>Athletics</p>
                </div>
                
                <div>
                    <button className={`${minorAtt === "athletics" && getValues("athletics") <= 1 || limitReached ? "hidden" : majorAtt === "athletics" && getValues("athletics") <= 2 || limitReached ? "hidden" : getValues("athletics") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'athletics', getValues("athletics") - 1, { shouldDirty: true })
                        }}>-</button>
                </div>
                <div className="p-1 grow">
                    <Controller
                    control={control}
                    name="athletics"
                    defaultValue={0}
                    render={({ field: { value,  onChange, name } }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 4}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange} 
                        value={value}
                        disabled={limitReached}
                        />
                    )}
                    />
                    
                </div>
                <div>
                    <button className={`${limitReached ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'athletics', getValues("athletics") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
            <div className="flex gap-3 items-center" id="stealth-row">
                <div>
                    <p>Stealth</p>
                </div>
                <div>
                    <button className={`${minorAtt === "stealth" && getValues("stealth") <= 1 || limitReached ? "hidden" : majorAtt === "stealth" && getValues("stealth") <= 2 || limitReached ? "hidden" : getValues("stealth") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'stealth', getValues("stealth") - 1, { shouldDirty: true })
                        }}>-</button>
                </div>
                <div className="grow p-1">
                    <Controller
                    control={control}
                    name="stealth"
                    defaultValue={0}
                    render={({ field: { value, onChange, name } }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 4}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        disabled={limitReached}
                        />
                    )}
                    />
                </div>
                <div>
                    <button className={`${limitReached ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'stealth', getValues("stealth") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
            <div className="flex gap-3 items-center" id="aiming-row">
                <div>
                    <p>Aiming</p>
                </div>
                <div>
                    <button className={`${minorAtt === "aiming" && getValues("aiming") <= 1 || limitReached ? "hidden" : majorAtt === "aiming" && getValues("aiming") <= 2 || limitReached ? "hidden" : getValues("aiming") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'aiming', getValues("aiming") - 1, { shouldDirty: true })
                        }}>-</button>
                </div>
                <div className="grow p-1">
                    <Controller
                    control={control}
                    name="aiming"
                    defaultValue={0}
                    render={({ field: { value, onChange, name } }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 4}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        disabled={limitReached}
                        />
                    )}
                    />
                </div>
                <div>
                    <button className={`${limitReached ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'aiming', getValues("aiming") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
            <div className="flex gap-3 items-center" id="striking-row">
                <div>
                    <p>Striking</p>
                </div>
                <div>
                    <button className={`${minorAtt === "striking" && getValues("striking") <= 1 || limitReached ? "hidden" : majorAtt === "striking" && getValues("striking") <= 2 || limitReached ? "hidden" : getValues("striking") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'striking', getValues("striking") - 1, { shouldDirty: true })
                        }}>-</button>
                </div>
                <div className="grow p-1">
                    <Controller
                    control={control}
                    name="striking"
                    defaultValue={0}
                    render={({ field: { value, onChange, name } }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 4}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        disabled={limitReached}
                        />
                    )}
                    />
                </div>
                <div>
                    <button className={`${limitReached ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'striking', getValues("striking") + 1, { shouldDirty: true })
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
                    <button className={`${minorAtt === "lore" && getValues("lore") <= 1 || limitReached ? "hidden" : majorAtt === "lore" && getValues("lore") <= 2 || limitReached ? "hidden" : getValues("lore") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'lore', getValues("lore") - 1, { shouldDirty: true })
                        }}>-</button>
                </div>
                <div className="grow p-1">
                    <Controller
                    control={control}
                    name="lore"
                    defaultValue={0}
                    render={({ field: { value, onChange, name} }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 4}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        disabled={limitReached}
                        />
                    )}
                    />
                </div>
                <div>
                    <button className={`${limitReached ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'lore', getValues("lore") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
            <div className="flex gap-3 items-center" id="tinker-row">
                <div>
                    <p>Tinker</p>
                </div>
                <div>
                    <button className={`${minorAtt === "tinker" && getValues("tinker") <= 1 || limitReached ? "hidden" : majorAtt === "tinker" && getValues("tinker") <= 2 || limitReached ? "hidden" : getValues("tinker") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'tinker', getValues("tinker") - 1, { shouldDirty: true })
                        }}>-</button>
                </div>
                <div className="grow p-1">
                    <Controller
                    control={control}
                    name="tinker"
                    defaultValue={0}
                    render={({ field: { value, onChange, name } }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 4}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        disabled={limitReached}
                        />
                    )}
                    />
                </div>
                <div>
                    <button className={`${limitReached ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'tinker', getValues("tinker") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
            <div className="flex gap-3 items-center" id="nature-row">
                <div>
                    <p>Nature</p>
                </div>
                <div>
                    <button className={`${minorAtt === "nature" && getValues("nature") <= 1 || limitReached ? "hidden" : majorAtt === "nature" && getValues("nature") <= 2 || limitReached ? "hidden" : getValues("nature") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'nature', getValues("nature") - 1, { shouldDirty: true })
                        }}>-</button>
                </div>
                <div className="grow p-1">
                    <Controller
                    control={control}
                    name="nature"
                    defaultValue={0}
                    render={({ field: { value, onChange, name } }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 4}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        disabled={limitReached}
                        />
                    )}
                    />
                </div>
                <div>
                    <button className={`${limitReached ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'nature', getValues("nature") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
            <div className="flex gap-3 items-center" id="healing-row">
                <div>
                    <p>Healing</p>
                </div>
                <div>
                    <button className={`${minorAtt === "healing" && getValues("healing") <= 1 || limitReached ? "hidden" : majorAtt === "healing" && getValues("healing") <= 2 || limitReached ? "hidden" : getValues("healing") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'healing', getValues("healing") - 1, { shouldDirty: true })
                        }}>-</button>
                </div>
                <div className="grow p-1">
                    <Controller
                    control={control}
                    name="healing"
                    defaultValue={0}
                    render={({ field: { value, onChange, name } }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 4}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        disabled={limitReached}
                        />
                    )}
                    />
                </div>
                <div>
                    <button className={`${limitReached ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'healing', getValues("healing") + 1, { shouldDirty: true })
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
                    <button className={`${minorAtt === "insight" && getValues("insight") <= 1 || limitReached ? "hidden" : majorAtt === "insight" && getValues("insight") <= 2 || limitReached ? "hidden" : getValues("insight") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'insight', getValues("insight") - 1, { shouldDirty: true })
                        }}>-</button>
                </div>
                <div className="grow p-1">
                    <Controller
                    control={control}
                    name="insight"
                    defaultValue={0}
                    render={({ field: { value, onChange, name } }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 4}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        disabled={limitReached}
                        />
                    )}
                    />
                </div>
                <div>
                    <button className={`${limitReached ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'insight', getValues("insight") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
            <div className="flex gap-3 items-center" id="perception-row">
                <div>
                    <p>Perception</p>
                </div>
                <div>
                    <button className={`${minorAtt === "perception" && getValues("perception") <= 1 || limitReached ? "hidden" : majorAtt === "perception" && getValues("perception") <= 2 || limitReached ? "hidden" : getValues("perception") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'perception', getValues("perception") - 1, { shouldDirty: true })
                        }}>-</button>
                </div>
                <div className="grow p-1">
                    <Controller
                    control={control}
                    name="perception"
                    defaultValue={0}
                    render={({ field: { value, onChange, name } }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 4}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        disabled={limitReached}
                        />
                    )}
                    />
                </div>
                <div>
                    <button className={`${limitReached ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'perception', getValues("perception") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
            <div className="flex gap-3 items-center" id="communication-row">
                <div>
                    <p>Communication</p>
                </div>
                <div>
                    <button className={`${minorAtt === "communication" && getValues("communication") <= 1 || limitReached ? "hidden" : majorAtt === "communication" && getValues("communication") <= 2 || limitReached ? "hidden" : getValues("communication") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'communication', getValues("communication") - 1, { shouldDirty: true })
                        }}>-</button>
                </div>
                <div className="grow p-1">
                    <Controller
                    control={control}
                    name="communication"
                    defaultValue={0}
                    render={({ field: { value, onChange, name } }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 4}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        disabled={limitReached}
                        />
                    )}
                    />
                </div>
                <div>
                    <button className={`${limitReached ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'communication', getValues("communication") + 1, { shouldDirty: true })
                        }}>+</button>
                </div>
            </div>
            <div className="flex gap-3 items-center" id="performance-row">
                <div>
                    <p>Performance</p>
                </div>
                <div>
                    <button className={`${minorAtt === "performance" && getValues("performance") <= 1 || limitReached ? "hidden" : majorAtt === "performance" && getValues("performance") <= 2 || limitReached ? "hidden" : getValues("performance") <= 0 ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'performance', getValues("performance") - 1, { shouldDirty: true })
                        }}>-</button>
                </div>
                <div className="grow p-1">
                    <Controller
                    control={control}
                    name="performance"
                    defaultValue={0}
                    render={({ field: { value, onChange, name} }) => (
                        <SliderComponent
                        axis={"x"}
                        xmax={limitReached ? value : 4}
                        xmin={name === minorAtt ? 1 : name === majorAtt ? 2 : 0}
                        xstep={1}
                        onChange={onChange}
                        value={value}
                        disabled={limitReached}
                        />
                    )}
                    />
                </div>
                <div>
                    <button className={`${limitReached ? "hidden" : null}`} onClick={(e) => {
                        e.preventDefault()
                        setValue( 'performance', getValues("performance") + 1, { shouldDirty: true })
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