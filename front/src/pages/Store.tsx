import { useEffect, useState } from "react"
import type { Product } from "../types";
import { ProductCard } from "../components/StoreComponents";

export default function Store()
{   
    const [products,setProducts] = useState<Product[]>([]);

    useEffect(()=>
    {
         setProducts([
            {
                name: "Notebook", description: "Lightweight laptop", price: 2999,
                id: ""
            },
            {
                name: "Headphones", description: "Noise cancelling", price: 499,
                id: ""
            },
        ])
    },[]);
    return(
        <div className=" h-fit  p-4 m-10 flex  gap-x-4 gap-y-8 ">
            {products.map((product: Product,index) => (
              <ProductCard key={index} product={product}/>
            ))
            }
        
        </div>
    )
}