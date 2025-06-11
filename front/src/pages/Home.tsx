import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import {TextInput,PassInput, SubmitButton} from "../components/FormComponents";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
export default function Home()
{
    const [user, setUser] = useState<string>('');
    const [pass, setPass] = useState<string>('');

    async function login(e: React.FormEvent<HTMLFormElement>)
    {   e.preventDefault();
        const { user, pass } = Object.fromEntries(new FormData(e.currentTarget)) as
        {
            user: string;
            pass: string;
        };
        if(!user || !pass)
        {
            toast.error('Preencha todos os campos!');
            return;
        }
        try{
            let res = await axios.post('http://localhost:8081/auth/login', {
                username:user,
                password:pass
            });
            console.log(res);
        }catch(err)
        {
            console.error(err);
            toast.error('Erro ao fazer login!');
            return;
        }
        toast.success('Login realizado com sucesso!');
    }
    
    return(
        <div className="flex md:flex-row flex-col md:gap-x-100 m-auto  h-fit gap-y-20">
        
            <span className="md:text-3xl text-blue-500 capitalize font-bold my-auto ">
                e-commerce project
            </span>
            <div className="bg-gray-100  border-blue text-blue-500 border-1 rounded p-4">
                <form className="flex flex-col gap-y-2" onSubmit={login}>
                    <label className="flex items-center ">
                        Usuário:   <FontAwesomeIcon icon={faUser} style={{color: "#0f4bff",padding:'5px'}} />
                    </label>
                <TextInput name='user'/>
                    <label className="flex items-center">
                        Senha:    <FontAwesomeIcon icon={faKey} style={{color: "#0f4bff",padding:'5px'}} />
                    </label>
                    <PassInput name={'pass'}/>

                    <SubmitButton/>
                    <Link to={'/Register'}>
                        registre-se
                    </Link>
                </form>
            </div>
          
        </div>
    )
}