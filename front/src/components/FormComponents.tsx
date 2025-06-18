export function TextInput({name} : {name:string})
{
    return ( 
         <input type="text" name={name} className="p-1 bg-white rounded border-blue border-1 rounded outline-none"/>
    )
}
export function PassInput({name} : {name:string})
{
    return ( 
         <input type="password" name={name} className="p-1 bg-white rounded border-blue border-1 rounded outline-none"/>
    )
}
export function SubmitButton()
{   
    return(
        <button className='capitalize rounded bg-blue-500 text-white cursor-pointer hover:scale-[1.1] transition-all ease-in-out duration-150 w-fit p-1 m-auto' type="submit">enviar</button>
    )
}