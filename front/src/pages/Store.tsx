import type { Product } from "../types";
import { ProductCard } from "../components/StoreComponents";
import axios from "axios";

export default function Store()
{   
 
    const { data: products, isLoading} = useQuery(["products"], async () => {
        const res = await axios.get("http://localhost:8082/products");
        return res.data;
    });

 
    return(
        <div className=" h-fit  p-4 m-10 flex  gap-x-4 gap-y-8 ">
            {products.map((product: Product, index : number) => (
              <ProductCard key={index} product={product}/>
            ))
            }
        
        </div>
    )
}

function useQuery(arg0: string[], arg1: () => Promise<any>): { data: any; isLoading: any; } {
    throw new Error("Function not implemented.");
}
