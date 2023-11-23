import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useLoginStore, useUserStore } from "../stores/MainStore"
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function LoginForm({loginFetching}){
  
  const { executeRecaptcha } = useGoogleReCaptcha();

  const updateLoginState = useLoginStore(state => state.updateLoginState)
  const loginAttempt = useLoginStore(state => state.loginAttempt)
  const updateLoginAttempt = useLoginStore(state => state.updateLoginAttempt)
  const updateLogoutState = useUserStore(state => state.updateLogoutState)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // const onSubmit = (data) => {

  //   updateLoginState(data)
  //   updateLoginAttempt()
  //   updateLogoutState(false)


  // };

 // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async (data) => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const token = await executeRecaptcha('yourAction');
    // Do whatever you want with the token
    if(token) {
      if(data.b_password){
        console.log("you're a bot")
      }else {
          updateLoginState(data)
        updateLoginAttempt()
        updateLogoutState(false)
      }
      
      
    } else {
      console.log("you're a robot")
    }
    
  }, [executeRecaptcha]);


  return (<>
  <form className="flex flex-col gap-5" onSubmit={handleSubmit(handleReCaptchaVerify)} >
      <div className="flex flex-col gap-1">
        {/* register your input into the hook by invoking the "register" function */}
        <input className="bg-gray-300 p-2" placeholder="email" {...register("email", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.email && <span className="text-gColorOne">This field is required</span>}
      </div>

      <div className="flex flex-col gap-1">
        {/* include validation with required or other standard HTML validation rules */}
        <input className="bg-gray-300 p-2" type="password" placeholder="password" {...register("password", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.password && <span className="text-gColorOne">This field is required</span>}
      </div>
      <input  type="text" className="hidden" tabIndex="-1" autoComplete="off" {...register("b_password")} />
      <input className={`${loginFetching ? "bg-gColorThree" : "bg-gColorOne hover:bg-gColorTwo cursor-pointer"} text-white py-2 w-60 mx-auto`} type="submit" value={loginFetching ? "loading..." : "Login"} disabled={loginFetching}/>
    </form>
  </>
    
  );
};
