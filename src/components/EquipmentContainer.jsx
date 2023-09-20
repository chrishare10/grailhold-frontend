import { Controller } from "react-hook-form";
import Rating from "react-rating";

export default function EquipmentContainer({control, getValues}) {
    
    return <>
    {control ? <div>
      <div id="equipment-container">
        <h2 className="font-bold">Equipment</h2>
        <div className="flex items-center gap-2" id="armor-row">
            <div>
                <p>Load</p>
            </div>
            <div className="p-1">
                <Controller
                control={control}
                name="loadValue"
                defaultValue={"standard"}
                render={({ field: {onChange, name } }) => (
                  <div onChange={onChange} className="flex flex-wrap gap-5 justify-between">
                    <div>
                      <input type="radio" value="light" name={name} /> Light
                    </div>
                    <div>
                      <input type="radio" value="standard" name={name} /> Standard
                    </div>
                    <div>
                      <input type="radio" value="heavy" name={name} /> Heavy
                    </div>
                  </div>
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
                <p>Ranged Weaopn</p>
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
        
    </div>
  
    :
    null
    }
</>
}