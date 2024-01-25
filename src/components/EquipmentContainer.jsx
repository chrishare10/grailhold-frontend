import { Controller } from "react-hook-form";
import Rating from "react-rating";

export default function EquipmentContainer({control, register, setValue}) {

    const handleReset = (e) => {
        e.preventDefault() 
        setValue( 'loadValue', 'standard', { shouldDirty: true })
        setValue( 'rationsValue', '0', { shouldDirty: true })
        setValue( 'armorValue', '0', { shouldDirty: true })
        setValue( 'shieldValue', '0', { shouldDirty: true })
        setValue( 'meleeWeaponValue', '0', { shouldDirty: true })
        setValue( 'rangedWeaponValue', '0', { shouldDirty: true })
        setValue( 'unusualWeaponValue', '0', { shouldDirty: true })
        setValue( 'disguiseValue', '0', { shouldDirty: true })
        setValue( 'documentsValue', '0', { shouldDirty: true })
        setValue( 'climbingToolValue', '0', { shouldDirty: true })
        setValue( 'navigationalToolValue', '0', { shouldDirty: true })
        setValue( 'demolitionToolValue', '0', { shouldDirty: true })
        setValue( 'tinkeringToolValue', '0', { shouldDirty: true })
        setValue( 'performanceToolValue', '0', { shouldDirty: true })
        setValue( 'firstAidValue', '0', { shouldDirty: true })
        setValue( 'lightSourceValue', '0', { shouldDirty: true })
            
    }
    
    return <>
    {control ? <div>
        <div id="equipment-container">
            <h2 className="font-bold">Equipment</h2>
            <div className="flex items-center gap-2" id="armor-row">
                <div>
                    <p>Load</p>
                </div>
                <div className="p-1">
                    {/* <Controller
                    control={control}
                    name="loadValue"
                    render={({ field: { value, onChange, name } }) => (
                    <div className="flex flex-wrap gap-3 md:gap-5 justify-between">
                        <div>
                        <input type="radio" value="light" name={name} onChange={onChange}/> Light
                        </div>
                        <div>
                        <input type="radio" value="standard" name={name} onChange={onChange}/> Standard
                        </div>
                        <div>
                        <input type="radio" value="heavy" name={name} onChange={onChange} /> Heavy
                        </div>
                    </div>
                    )}
                    /> */}


                    <div className="flex flex-wrap gap-3 md:gap-5 justify-between max-w-wickedSmall md:max-w-none">
                        <div className="flex items-center gap-1">
                            <input type="radio" value="light" {...register("loadValue")}/> <p>Light (3)</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <input type="radio" value="standard" {...register("loadValue")}/> <p>Standard (6)</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <input type="radio" value="heavy" {...register("loadValue")} /> <p>Heavy (9)</p>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="flex items-center gap-2" id="rations-row">
                <div>
                    <p>Rations</p>
                </div>
                <div className="p-1">
                    <Controller
                    control={control}
                    name="rationsValue"
                    defaultValue={0}
                    render={({ field: { value,  onChange, name } }) => (
                    <Rating 
                    fullSymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><rect x="2.93" y="2.93" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.1421 10)" width="14.14" height="14.14"/></svg>} 
                    emptySymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><path d="M10,0L0,10l10,10l10-10L10,0z M4,10l6-6l6,6l-6,6L4,10z"/></svg>} 
                    initialRating={value} 
                    start={0} 
                    stop={7} 
                    onChange={onChange} 
                    className="rating-dimonds"
                    />
                    )}
                    />
                    
                </div>
            </div>
            <div className="flex items-center gap-2" id="armor-row">
                <div>
                    <p>Armor</p>
                </div>
                <div className="p-1">
                    <Controller
                    control={control}
                    name="armorValue"
                    defaultValue={0}
                    render={({ field: { value,  onChange, name } }) => (
                    <Rating 
                    fullSymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><rect x="2.93" y="2.93" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.1421 10)" width="14.14" height="14.14"/></svg>} 
                    emptySymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><path d="M10,0L0,10l10,10l10-10L10,0z M4,10l6-6l6,6l-6,6L4,10z"/></svg>} 
                    initialRating={value} 
                    start={0} 
                    stop={7} 
                    onChange={onChange} 
                    className="rating-dimonds"
                    />
                    )}
                    />
                    
                </div>
            </div>
            <div className="flex items-center gap-2" id="armor-row">
                <div>
                    <p>Shield</p>
                </div>
                <div className="p-1">
                    <Controller
                    control={control}
                    name="shieldValue"
                    defaultValue={0}
                    render={({ field: { value,  onChange, name } }) => (
                    <Rating 
                    fullSymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><rect x="2.93" y="2.93" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.1421 10)" width="14.14" height="14.14"/></svg>} 
                    emptySymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><path d="M10,0L0,10l10,10l10-10L10,0z M4,10l6-6l6,6l-6,6L4,10z"/></svg>} 
                    initialRating={value} 
                    start={0} 
                    stop={3} 
                    onChange={onChange} 
                    className="rating-dimonds"
                    />
                    )}
                    />
                    
                </div>
            </div>
            <div className="flex items-center gap-2" id="armor-row">
                <div>
                    <p>Melee Weapon</p>
                </div>
                <div className="p-1">
                    <Controller
                    control={control}
                    name="meleeWeaponValue"
                    defaultValue={0}
                    render={({ field: { value,  onChange, name } }) => (
                    <Rating 
                    fullSymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><rect x="2.93" y="2.93" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.1421 10)" width="14.14" height="14.14"/></svg>} 
                    emptySymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><path d="M10,0L0,10l10,10l10-10L10,0z M4,10l6-6l6,6l-6,6L4,10z"/></svg>} 
                    initialRating={value} 
                    start={0} 
                    stop={3} 
                    onChange={onChange} 
                    className="rating-dimonds"
                    />
                    )}
                    />
                    
                </div>
            </div>
            <div className="flex items-center gap-2" id="armor-row">
                <div>
                    <p>Ranged Weapon</p>
                </div>
                <div className="p-1">
                    <Controller
                    control={control}
                    name="rangedWeaponValue"
                    defaultValue={0}
                    render={({ field: { value,  onChange, name } }) => (
                    <Rating 
                    fullSymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><rect x="2.93" y="2.93" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.1421 10)" width="14.14" height="14.14"/></svg>} 
                    emptySymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><path d="M10,0L0,10l10,10l10-10L10,0z M4,10l6-6l6,6l-6,6L4,10z"/></svg>} 
                    initialRating={value} 
                    start={0} 
                    stop={3} 
                    onChange={onChange} 
                    className="rating-dimonds"
                    />
                    )}
                    />
                    
                </div>
            </div>
            <div className="flex items-center gap-2" id="armor-row">
                <div>
                    <p>Unusual Weapon</p>
                </div>
                <div className="p-1">
                    <Controller
                    control={control}
                    name="unusualWeaponValue"
                    defaultValue={0}
                    render={({ field: { value,  onChange, name } }) => (
                    <Rating 
                    fullSymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><rect x="2.93" y="2.93" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.1421 10)" width="14.14" height="14.14"/></svg>} 
                    emptySymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><path d="M10,0L0,10l10,10l10-10L10,0z M4,10l6-6l6,6l-6,6L4,10z"/></svg>} 
                    initialRating={value} 
                    start={0} 
                    stop={3} 
                    onChange={onChange} 
                    className="rating-dimonds"
                    />
                    )}
                    />
                    
                </div>
            </div>
            <div className="flex items-center gap-2" id="armor-row">
                <div>
                    <p>Disguise</p>
                </div>
                <div className="p-1">
                    <Controller
                    control={control}
                    name="disguiseValue"
                    defaultValue={0}
                    render={({ field: { value,  onChange, name } }) => (
                    <Rating 
                    fullSymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><rect x="2.93" y="2.93" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.1421 10)" width="14.14" height="14.14"/></svg>} 
                    emptySymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><path d="M10,0L0,10l10,10l10-10L10,0z M4,10l6-6l6,6l-6,6L4,10z"/></svg>} 
                    initialRating={value} 
                    start={0} 
                    stop={1} 
                    onChange={onChange} 
                    className="rating-dimonds"
                    />
                    )}
                    />
                    
                </div>
            </div>
            <div className="flex items-center gap-2" id="armor-row">
                <div>
                    <p>Documents</p>
                </div>
                <div className="p-1">
                    <Controller
                    control={control}
                    name="documentsValue"
                    defaultValue={0}
                    render={({ field: { value,  onChange, name } }) => (
                    <Rating 
                    fullSymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><rect x="2.93" y="2.93" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.1421 10)" width="14.14" height="14.14"/></svg>} 
                    emptySymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><path d="M10,0L0,10l10,10l10-10L10,0z M4,10l6-6l6,6l-6,6L4,10z"/></svg>} 
                    initialRating={value} 
                    start={0} 
                    stop={1} 
                    onChange={onChange} 
                    className="rating-dimonds"
                    />
                    )}
                    />
                    
                </div>
            </div>
            <div className="flex items-center gap-2" id="armor-row">
                <div>
                    <p>Climbing Tool</p>
                </div>
                <div className="p-1">
                    <Controller
                    control={control}
                    name="climbingToolValue"
                    defaultValue={0}
                    render={({ field: { value,  onChange, name } }) => (
                    <Rating 
                    fullSymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><rect x="2.93" y="2.93" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.1421 10)" width="14.14" height="14.14"/></svg>} 
                    emptySymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><path d="M10,0L0,10l10,10l10-10L10,0z M4,10l6-6l6,6l-6,6L4,10z"/></svg>} 
                    initialRating={value} 
                    start={0} 
                    stop={1} 
                    onChange={onChange} 
                    className="rating-dimonds"
                    />
                    )}
                    />
                    
                </div>
            </div>
            <div className="flex items-center gap-2" id="armor-row">
                <div>
                    <p>Navigational Tool</p>
                </div>
                <div className="p-1">
                    <Controller
                    control={control}
                    name="navigationalToolValue"
                    defaultValue={0}
                    render={({ field: { value,  onChange, name } }) => (
                    <Rating 
                    fullSymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><rect x="2.93" y="2.93" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.1421 10)" width="14.14" height="14.14"/></svg>} 
                    emptySymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><path d="M10,0L0,10l10,10l10-10L10,0z M4,10l6-6l6,6l-6,6L4,10z"/></svg>} 
                    initialRating={value} 
                    start={0} 
                    stop={1} 
                    onChange={onChange} 
                    className="rating-dimonds"
                    />
                    )}
                    />
                    
                </div>
            </div>
            <div className="flex items-center gap-2" id="armor-row">
                <div>
                    <p>Demolition Tool</p>
                </div>
                <div className="p-1">
                    <Controller
                    control={control}
                    name="demolitionToolValue"
                    defaultValue={0}
                    render={({ field: { value,  onChange, name } }) => (
                    <Rating 
                    fullSymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><rect x="2.93" y="2.93" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.1421 10)" width="14.14" height="14.14"/></svg>} 
                    emptySymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><path d="M10,0L0,10l10,10l10-10L10,0z M4,10l6-6l6,6l-6,6L4,10z"/></svg>} 
                    initialRating={value} 
                    start={0} 
                    stop={1} 
                    onChange={onChange} 
                    className="rating-dimonds"
                    />
                    )}
                    />
                    
                </div>
            </div>
            <div className="flex items-center gap-2" id="armor-row">
                <div>
                    <p>Tinkering Tool</p>
                </div>
                <div className="p-1">
                    <Controller
                    control={control}
                    name="tinkeringToolValue"
                    defaultValue={0}
                    render={({ field: { value,  onChange, name } }) => (
                    <Rating 
                    fullSymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><rect x="2.93" y="2.93" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.1421 10)" width="14.14" height="14.14"/></svg>} 
                    emptySymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><path d="M10,0L0,10l10,10l10-10L10,0z M4,10l6-6l6,6l-6,6L4,10z"/></svg>} 
                    initialRating={value} 
                    start={0} 
                    stop={1} 
                    onChange={onChange} 
                    className="rating-dimonds"
                    />
                    )}
                    />
                    
                </div>
            </div>
            <div className="flex items-center gap-2" id="armor-row">
                <div>
                    <p>Performance Tool</p>
                </div>
                <div className="p-1">
                    <Controller
                    control={control}
                    name="performanceToolValue"
                    defaultValue={0}
                    render={({ field: { value,  onChange, name } }) => (
                    <Rating 
                    fullSymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><rect x="2.93" y="2.93" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.1421 10)" width="14.14" height="14.14"/></svg>} 
                    emptySymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><path d="M10,0L0,10l10,10l10-10L10,0z M4,10l6-6l6,6l-6,6L4,10z"/></svg>} 
                    initialRating={value} 
                    start={0} 
                    stop={1} 
                    onChange={onChange} 
                    className="rating-dimonds"
                    />
                    )}
                    />
                    
                </div>
            </div>
            <div className="flex items-center gap-2" id="armor-row">
                <div>
                    <p>First Aid</p>
                </div>
                <div className="p-1">
                    <Controller
                    control={control}
                    name="firstAidValue"
                    defaultValue={0}
                    render={({ field: { value,  onChange, name } }) => (
                    <Rating 
                    fullSymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><rect x="2.93" y="2.93" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.1421 10)" width="14.14" height="14.14"/></svg>} 
                    emptySymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><path d="M10,0L0,10l10,10l10-10L10,0z M4,10l6-6l6,6l-6,6L4,10z"/></svg>} 
                    initialRating={value} 
                    start={0} 
                    stop={1} 
                    onChange={onChange} 
                    className="rating-dimonds"
                    />
                    )}
                    />
                    
                </div>
            </div>  
            <div className="flex items-center gap-2" id="armor-row">
                <div>
                    <p>Light Source</p>
                </div>
                <div className="p-1">
                    <Controller
                    control={control}
                    name="lightSourceValue"
                    defaultValue={0}
                    render={({ field: { value,  onChange, name } }) => (
                    <Rating 
                    fullSymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><rect x="2.93" y="2.93" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.1421 10)" width="14.14" height="14.14"/></svg>} 
                    emptySymbol={<svg viewBox="0 0 20 20" className="w-5 h-5"><path d="M10,0L0,10l10,10l10-10L10,0z M4,10l6-6l6,6l-6,6L4,10z"/></svg>} 
                    initialRating={value} 
                    start={0} 
                    stop={2} 
                    onChange={onChange} 
                    className="rating-dimonds"
                    />
                    )}
                    />
                    
                </div>
            </div>
  
        
        </div>
        <div>
            <button onClick={handleReset} className="text-sm text-gray-500">reset equipment</button>
        </div>
        
    </div>
  
    :
    null
    }
</>
}