import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Layout() {
  const {user,logout} = useAuth();
  return (
    <div className='flex flex-col h-screen '>
      <Toaster/>
      <header className='bg-blue-500 text-white w-full h-15 capitalize font-bold text-center items-center justify-center flex'> 
          e-commerce project
        
        </header>
      <main className='flex size-full'>
         {user!=null?
            <button
            className="self-end absolute right-0 bg-red-800 h-fit self-right m-4 text-white rounded  hover:scale-[1.1]  font-bold transition-all ease-in-out duration-150  p-2 capitalize cursor-pointer"
            onClick={logout}
            > 
            logout 
            </button> : ''}
        <Outlet/>
      </main>
      <footer></footer>
    </div>
  )
}