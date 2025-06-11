import type { FormEvent } from "react";
import { PassInput, SubmitButton, TextInput } from "../components/FormComponents";
import axios from "axios";
import toast,{Toaster} from "react-hot-toast";
export default function Register()
{
    async function handleSubmit(e : FormEvent<HTMLFormElement>)
    {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const { user, email, password, confirm_password }  = Object.fromEntries(formData) as
        {
            user: string;
            email: string;  
            password: string;
            confirm_password: string;
        };

        console.log({ user, email, password, confirm_password });

        if(password !== confirm_password)
        {
            toast.error('As senhas não conferem!');
            return;   
        }
        try{
            let res = await axios.post('http://localhost:8081/auth/register', { 
                
                user,
                email,
                password,
                
            })
            console.log(res);
        }
        catch(err)
        {
            console.error(err);
            alert('Erro ao registrar usuário');
            return;
        }

      

        
        toast.success('Usuário registrado com sucesso!');
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