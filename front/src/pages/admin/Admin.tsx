import { useState } from "react"
import { ProductForm } from "../../components/AdmComponents"
import { Toaster } from "react-hot-toast";

export default function Admin(){

    const [productForm,setProductForm] = useState<boolean>(false);
    const [removeCard,setRemoveCard] = useState<boolean>(false);

    return(
        <div className="flex h-screen gradient-anim">
            <Toaster/>
            <div className="m-auto flex flex-col gap-y-4">
                <h1 className="text-5xl m-auto">AREA DO ADM!!</h1>
                {!productForm?(  
                    <div className="text-white flex gap-x-4  m-auto text-xl bg-black rounded p-4 ">

              
                    <button className="cursor-pointer capitalize hover:scale-[1.1] transition-all ease-in-out duration-150  gradient-text-anim" onClick={()=>{setProductForm(e=>!e)}}>
                        criar produto
                    </button>
                    <button className="cursor-pointer capitalize hover:scale-[1.1] transition-all ease-in-out duration-150 gradient-text-anim">remover produto</button>
                </div>
                ): (
                <>
                    <button 
                    className="bg-red-800 w-1/2 text-white rounded  hover:scale-[1.1]  font-bold transition-all ease-in-out duration-150 m-auto p-2 capitalize cursor-pointer"
                    onClick={()=>{
                        setProductForm(false);
                        setRemoveCard(false);
                    }}>
                        voltar 
                    </button> 
                    <ProductForm/>
                </>
                
                )}
              
            </div>
        </div>
    )
}