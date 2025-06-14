import type { Product } from "../types";
import { ProductCard } from "../components/StoreComponents";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';


export default function Store()
{   
 
    const { data: products, isLoading} = useQuery({queryKey:["products"], queryFn:async () => {
        const res = await axios.get("http://localhost:8080/product");
        return res.data;
        console.log(res.data);
    }});

    if (isLoading) {
        return <div>Carregando produtos...</div>;
    }

  if (!products) {
    return <div>Nenhum produto encontrado.</div>;
  }
 
    return(
        <div className=" h-fit  p-4 m-10 flex  gap-x-4 gap-y-8 ">
            {products.map((product: Product, index : number) => (
              <ProductCard key={index} product={product}/>
            ))
            }
        
        </div>
    )
}

