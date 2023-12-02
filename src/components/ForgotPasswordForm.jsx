import { useForm } from 'react-hook-form';

export default function ForgotPasswordForm() {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    return <div className="">
        <form className="flex flex-col gap-5" method="post" action="http://cms.grailhold.com/users/send-password-reset-email" >
            <input type="text" name="loginName"/>
            <input type="submit" value="submit" className="bg-gColorOne hover:bg-gColorTwo cursor-pointer text-white py-2 w-60 mx-auto"/>
        </form>
    </div>
}