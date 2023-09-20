import Slider from "react-input-slider";

export default function SliderComponent({ axis, xmax, xmin, xstep, onChange, value, disabled }) {
    let previousValue
    return (
      <div className="flex gap-4 items-center" >
        
        <Slider
          axis={axis}
          x={value}
          xmax={xmax}
          xmin={xmin}
          xstep={xstep}
          onChange={({ x }) => {
            if(x != previousValue){
                onChange(x)
                previousValue = x
            }
        }}
          
          disabled={disabled}
          styles={{
            track: {
              backgroundColor: 'rgba(0,0,0,.1)',
              height: "2px"
            },
            active: {
              backgroundColor: 'none'
            },
            thumb: {
              width: 10,
              height: 10,
              backgroundColor: 'black',
              borderRadius: "none",
              transform: "rotate(45deg)"
            },
            disabled: {
              opacity: 0.5
            }
          }}
        />
        <p>
            {value}
        </p>
      </div>
      
    );
  }