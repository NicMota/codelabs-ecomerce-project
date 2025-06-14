import { Link } from "react-router-dom";


export default function Success(){

    return(
        <div className="flex bg-blue-500 h-screen ">
            <div className="flex flex-col bg-white rounded border m-auto h-1/5 p-4 text-2xl border-blue-800">
                <h1 className="m-auto">compra realizada com sucesso</h1>
                <Link to={'/store'}>voltar</Link>
            </div>
        </div>
    )
}