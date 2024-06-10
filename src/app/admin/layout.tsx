import React from 'react'
import SideNav from './components/SideNav';
import { TooltipProvider } from "@/components/ui/tooltip";


export const metadata ={
    title:'Shop-Admin',
    description:'Admin Dashboard'
};

const AdminLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
      {/* <div>Side Navbar</div> */}
      <TooltipProvider>
      <SideNav />
      </TooltipProvider>
      {children}
    </div>
  )
}

export default AdminLayout
