
import type {Product} from '../types';
import { useState } from 'react';
import axios from 'axios';
export function ProductCard({product} : {product:Product})
{   

    const [quantity,setQuantity] = useState<number>(1);

    async function handleBuy()
    {
        try {
            const res = await axios.post("http://localhost:8080/payment/checkout",
            {   
                id:product.id,
                name:product.name,
                amount:product.price,
                currency:"BRL",
                quantity:quantity,
                
            });
            window.location.href = res.data.sessionUrl;
        } catch (error) {
            console.error("Erro ao realizar checkout:", error);
            alert("Erro ao tentar comprar. Verifique a conexão com o servidor.");
        }
    }
    function price_converter(price:number)
    {   
        price = price / 100;
        return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    return(
       
        <div className="flex flex-col bg-blue-100 border-1 p-2 border-blue-500 rounded w-50 min-h-70 h-70 max-h-fit ">
            <div className="flex h-2/3 bg-gray-100 rounded">
                
            </div>
        
            <div className="flex  flex-col h-fit gap-y-2">
                <div className='flex flex-col'>
                    <p> {product.name}</p>
                    <p> {product.description}</p>
                    <p><strong>{price_converter(product.price)}</strong></p>
                </div>
              
                <select className='bg-white rounded outline-none w-fit m-auto text-xl border-1 border-blue-500'  onChange={(e) => setQuantity(Number(e.target.value))}>
                    {Array.from({length: product.quantity}, (_, i) => i + 1).map((q) => (
                        <option key={q} value={q}>
                            {q}
                        </option>
                    ))}
                </select>
                <button className="cursor-pointer bg-blue-500 text-white rounded  self-end p-1 mx-auto hover:scale-[1.1] transition-all ease-in-out" onClick={handleBuy}>
                    Comprar
                </button>
            </div>
        
        </div>
    
    )
}