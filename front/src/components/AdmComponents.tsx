import type { FormEvent } from "react";


import toast from "react-hot-toast";
import api from "../lib/axios";
import type { Product } from "../types";
import axios from "axios";
import { useState, type ChangeEvent } from "react";

export function ProductForm({ onCreate }: { onCreate: () => void }) {
  const [price, setPrice] = useState<number>(50);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const { name, description, quantity } = Object.fromEntries(formData);

    try {
      let res = await api.post("/product", {
        name,
        description,
        price, 
        quantity
      });

      if (res.status == 201) {
        toast.success("Produto Criado com Sucesso");
        form.reset();
        setPrice(0);
        onCreate();
      }
    } catch (error) {
      console.error("erro", error);
      alert("erro na submissao do produto");
    }
  }

  function handlePriceChange(e: ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value) || 50;
    if (value < 0) {
      toast.error("O preço não pode ser negativo");
      return;
    }
    if (value > 1000000) {
      toast.error("O preço não pode ser maior que R$ 10.000,00");
      return;
    }

    setPrice(value);
  }

  function formatPrice(value: number) {
    return (value / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  return (
    <div className="bg-black flex p-2 rounded">
      <form className="flex flex-col gap-y-2 m-auto text-white" onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input type="text" name="name" className="bg-white rounded outline-none text-black text-xl p-1" />
        <label>Descrição:</label>
        <textarea name="description" className="bg-white rounded outline-none text-black text-xl p-1" />
        <label>Preço (em centavos):</label>
        <input
          name="price"
          type="number"
          min={50}
          value={price}
          onChange={handlePriceChange}
          className="bg-white rounded outline-none text-black text-xl p-1"
        />
        <span className="text-green-500 font-bold">{formatPrice(price)}</span>

        <label>Quantidade:</label>
        <input name="quantity" type="number" className="bg-white rounded outline-none text-black text-xl p-1" />
        <button
          className="rounded bg-blue-800 w-1/2 m-auto capitalize p-2 font-bold hover:scale-[1.1] duration-150 transition-all ease-in-out cursor-pointer"
          type="submit"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export function ProductsList({products,  onRemove} : {products:Product[],onRemove :()=>void})
{   
    async function removeProduct(id:string)
    {
        try {
            let res = await api.delete(`/product/${id}`);

            if(res.status == 200)
            {
                toast.success('Produto removido com sucesso');
                onRemove();
            }
        } catch (error) {
            console.error('Erro ao remover produto:', error);
            toast.error('Erro ao remover produto');
        }
    }
    return(
        <div className="bg-black flex flex-col gap-y-2 p-2 rounded">
            {products.map((product :Product) => (
                <div key={product.id} className="bg-gray-800 flex p-2 rounded text-white">
                    <div className="flex flex-col gap-y-2">
                        <h2 className="text-xl font-bold">{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Preço: {(product.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        <p>Quantidade: {product.quantity}</p>
                    </div>
                    <button className="my-auto ml-auto bg-red-500 rounded p-1 px-2 self-end hover:scale-[1.2] duration-150 transition-all ease-in-out cursor-pointer" onClick={()=>{removeProduct(product.id)}}>X</button>

                </div>
            ))}
        </div>
    )
}
