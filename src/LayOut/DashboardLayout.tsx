import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Dashboard/Sidebar/Sidebar'



const DashboardLayout = () => {
  return (
    <div className='relative min-h-screen md:flex'>
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