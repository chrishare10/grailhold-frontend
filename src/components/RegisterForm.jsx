import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { useRegisterStore, useLoginStore } from "../stores/MainStore"
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';


export default function RegisterForm(){

  const { executeRecaptcha } = useGoogleReCaptcha();
  
  const updateRegisterState = useRegisterStore(state => state.updateRegisterState)
  const updateLoginPanelState = useLoginStore(state => state.updateLoginPanelState)
  const updateRegisterPanelState = useRegisterStore(state => state.updateRegisterPanelState)
  const registerAttempt = useRegisterStore(state => state.registerAttempt)
  const updateRegisterAttempt = useRegisterStore(state => state.updateRegisterAttempt)

  const { register, handleSubmit, formState: { errors } } = useForm();

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async (data) => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const token = await executeRecaptcha('yourAction');
    // Do whatever you want with the token
    if(token) {
      if(data.a_password){
        console.log("you're a bot")
      }else {
        console.log(data)
        updateRegisterState(data)
        updateRegisterAttempt()
        updateLoginPanelState(true)
        updateRegisterPanelState(false) 
      }
      
      
    } else {
      console.log("you're a robot")
    }
    
  }, [executeRecaptcha]);


  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(handleReCaptchaVerify)}>
      <div className="flex flex-col gap-1">
        {/* register your input into the hook by invoking the "register" function */}
        <input className="bg-gray-300 p-2" placeholder="email" {...register("email", { required: "email is required" })} />
        {/* errors will return when field validation fails  */}
        {errors.email && <span className="text-red-300">This field is required</span>}
      </div>

      <div className="flex flex-col gap-1">
        {/* include validation with required or other standard HTML validation rules */}
        <input className="bg-gray-300 p-2" placeholder="password" {...register("password", { 
          required: true, 
          minLength: {
            value: 6,
            message: "Password must contain 6 or more characters"
          }
          })} />
        {/* errors will return when field validation fails  */}
        {errors.password?.message ? <p className="text-red-300">{errors.password?.message}</p> : errors.password && <p className="text-red-300">This field is required</p>}
      </div>

      <div className="flex flex-col gap-1">
        {/* include validation with required or other standard HTML validation rules */}
        <input className="bg-gray-300 p-2" placeholder="name" {...register("name", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.name && <span className="text-red-300">This field is required</span>}
      </div>
      
      <input  type="text" className="hidden" tabIndex="-1" autoComplete="off" {...register("a_password")} />

      <input className="bg-blue cursor-pointer hover:bg-purple text-white py-2 w-60 mx-auto" type="submit" value="Create Account" />
    </form>
  );
};
