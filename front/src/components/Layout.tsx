import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='flex flex-col h-screen '>
      <header className='bg-blue-500 text-white w-full h-15 capitalize font-bold text-center items-center justify-center flex'> loja fodona</header>
      <main className='flex size-full'>
        <Outlet/>
      </main>
      <footer></footer>
    </div>
  )
}