import type { FormEvent } from "react";


import toast from "react-hot-toast";
import api from "../lib/axios";

export function ProductForm()
{   
    async function handleSubmit(e:FormEvent<HTMLFormElement>)
    {   
        e.preventDefault();
         const form = e.currentTarget;
        const formData = new FormData(form);

        const {name,description,price} = Object.fromEntries(formData);
       

        try {
             let res = await api.post("/product",
                {
                    name:name,
                    description:description,
                    price:price
                }
            )
            console.log(res);
            if(res.status == 201)
            {
                toast.success('Produto Criado com Sucesso');
                form.reset();
            }
                
        } catch (error) {
            console.error('erro',error);
            alert('erro na submissao do produto');
        }
       

    }
    return(
       <div className="bg-black flex p-4 rounded">
            <form className="flex flex-col gap-y-4 m-auto text-white" onSubmit={handleSubmit}>
                <label>Nome:</label>
                <input type="text" name='name' className="bg-white rounded outline-none text-black text-xl p-1"/>
                <label>Descricao:</label>
                <textarea name='description' className="bg-white rounded outline-none text-black text-xl p-1"/>
                <label>Preço:</label>
                <input name='price' type="number" className="bg-white rounded outline-none text-black text-xl p-1"/>
                <button className='rounded bg-blue-800 w-1/2 m-auto capitalize p-2 font-bold hover:scale-[1.1] duration-150 transition-all ease-in-out cursor-pointer'  type='submit'>cadastrar</button>
            </form>
       </div>
    )
}