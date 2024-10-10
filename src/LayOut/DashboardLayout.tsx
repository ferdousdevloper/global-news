import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Dashboard/Sidebar/Sidebar'
import { Toaster } from 'react-hot-toast'



const DashboardLayout = () => {
  return (
    <div className='relative min-h-screen md:flex bg-neutral-950 glass'>
      <Toaster></Toaster>
      {/* Sidebar */}
      <Sidebar /> 

      {/* Outlet --> Dynamic content */}
      <div className='flex-1 p-8 items-end justify-end w-full'>
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout