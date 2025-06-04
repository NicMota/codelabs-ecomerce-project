import type { FormEvent } from "react";
import { PassInput, SubmitButton, TextInput } from "../components/FormComponents";

export default function Register()
{
    function handleSubmit(e : FormEvent<HTMLFormElement>)
    {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const { user, email, password, confirm_password } = Object.fromEntries(formData);

        console.log({ user, email, password, confirm_password });
        
        alert('registrou');
    }
    return(
        <form onSubmit={handleSubmit}className="text-blue-500 bg-gray-100 m-auto border-1 border-blue-500 p-2 rounded flex flex-col gap-y-2">
            <label>
                usuário:
            </label>
            <TextInput name={'user'}/>
              <label>
                email:
            </label>
            <TextInput name = {'email'}/>
            <label>
                senha
            </label>
            <PassInput name={'password'}/>
            <label>
                confirmar senha:
            </label>
             <PassInput name={'confirm_password'}/>
            <SubmitButton/>
        </form>
    )
}