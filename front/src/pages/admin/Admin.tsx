import { useState } from "react"
import { ProductForm, ProductsList } from "../../components/AdmComponents"
import { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios";
export default function Admin(){

    const [productForm,setProductForm] = useState<boolean>(false);
    const [removeCard,setRemoveCard] = useState<boolean>(false);
    const {user,logout} = useAuth();

    const {data:products,error,refetch} = useQuery({
        queryKey:['products'],
        queryFn:async ()=>{
            const res = await api.get('/product');
            if(res.status!=200) throw new Error('Erro ao carregar produtos');
            return res.data;
        },
        refetchOnWindowFocus:false,
        retry:1,
    });
  
    if(error)
    {
        console.error('Erro ao carregar produtos',error);
        return <div className="text-white">Erro ao carregar produtos</div>
    }
    return(
        <div className="flex h-screen min-h-fit gradient-anim">   
            {user!=null?
            <button
            className="self-end absolute right-0 bg-red-800 h-fit self-right m-4 text-white rounded  hover:scale-[1.1]  font-bold transition-all ease-in-out duration-150  p-2 capitalize cursor-pointer"
            onClick={logout}
            > 
            logout 
            </button> : ''}
            <Toaster/>
            <div className="m-auto flex flex-col gap-y-4">
                <h1 className="text-5xl m-auto">AREA DO ADM!!</h1>
                {!productForm && !removeCard&&(  
                    <div className="text-white flex gap-x-4  m-auto text-xl bg-black rounded p-4 ">

              
                    <button className="cursor-pointer capitalize hover:scale-[1.1] transition-all ease-in-out duration-150  gradient-text-anim" onClick={()=>{setProductForm(e=>!e)}}>
                        criar produto
                    </button>
                    <button className="cursor-pointer capitalize hover:scale-[1.1] transition-all ease-in-out duration-150 gradient-text-anim" onClick={()=>{setRemoveCard(e=>!e)}}>
                        remover produto
                    </button>
                </div>
                )}
                {productForm&&(
                <>
                    <button 
                    className="bg-red-800 w-1/2 text-white rounded  hover:scale-[1.1]  font-bold transition-all ease-in-out duration-150 m-auto p-2 capitalize cursor-pointer"
                    onClick={()=>{
                        setProductForm(false);
                        //setRemoveCard(false);
                    }}>
                        voltar 
                    </button> 
                    <ProductForm onCreate={refetch}/>
                </>
                
                )}
                {removeCard &&(
                    <>
                        <button 
                        className="bg-red-800 w-1/2 text-white rounded  hover:scale-[1.1]  font-bold transition-all ease-in-out duration-150 m-auto p-2 capitalize cursor-pointer"
                        onClick={()=>{
                            setRemoveCard(false);
                            //setRemoveCard(false);
                        }}>
                            voltar 
                        </button> 
                        <ProductsList products={products} onRemove={refetch}/>

                    </>
                     
                ) }
              
            </div>
        </div>
    )
}