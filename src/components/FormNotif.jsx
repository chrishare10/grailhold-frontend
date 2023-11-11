

export default function FormNotif({loginError}) {

    return<div>
        {loginError ? <p className="text-gColorOne">{loginError.response.errors[0].message}</p> : null}
    </div>
}