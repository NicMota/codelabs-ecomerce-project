import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import {TextInput,PassInput, SubmitButton} from "../components/FormComponents";
export default function Home()
{
    return(
        <div className="flex md:flex-row flex-col md:gap-x-100 m-auto  h-fit gap-y-20">
        
            <span className="md:text-3xl text-blue-500 capitalize font-bold my-auto ">
                e-commerce project
            </span>
            <div className="bg-gray-100 flex flex-col border-blue text-blue-500 border-1 rounded p-4 gap-y-2">
                <label className="flex items-center ">
                    Usuário:   <FontAwesomeIcon icon={faUser} style={{color: "#0f4bff",padding:'5px'}} />
                </label>
               <TextInput name='user' />
                <label className="flex items-center">
                    Senha:    <FontAwesomeIcon icon={faKey} style={{color: "#0f4bff",padding:'5px'}} />
                </label>
                <PassInput name={'pass'}/>

               <SubmitButton/>
                <Link to={'/Register'}>
                    registre-se
                </Link>
            </div>
          
        </div>
    )
}