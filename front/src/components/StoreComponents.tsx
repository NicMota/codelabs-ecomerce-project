import { Link } from 'react-router-dom';
import type {Product} from '../types';
export function ProductCard({product} : {product:Product})
{
    return(
        <Link to={'/'}>     
            <div className="flex flex-col bg-blue-100 border-1 p-2 border-blue-500 rounded w-50 min-h-70 h-70 max-h-fit ">
                <div className="flex h-2/3 bg-gray-100 rounded">

                </div>
            
                <div className="flex  flex-col h-fit">
                    <p> {product.name}</p>
                    <p> {product.description}</p>
                    <p>R$<strong>{product.price}</strong></p>
                    <button className="cursor-pointer bg-blue-500 text-white rounded  self-end p-1 mx-auto hover:scale-[1.1] transition-all ease-in-out">
                        comprar
                    </button>
                </div>
            </div>
        </Link>
    )
}