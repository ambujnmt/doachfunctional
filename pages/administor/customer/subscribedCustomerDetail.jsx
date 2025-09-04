import React, { useState } from "react";   
import Header from '../../../components/Admin/Layouts/Header';
import SideBar from '../../../components/Admin/Layouts/SideBar';
import Footer from '../../../components/Admin/Layouts/Footer';
import PrivateAdminRoute from "../../../components/PrivateRoute/PrivateAdminRoute";
import SubscribedCustomerDetail from "../../../components/Admin/Customer/SubscribedCustomerDetail";

export default function subscribedCustomerDetail() {
   const [menuOpen, setMenuOpen] = useState(false); 
  
    return (
      <PrivateAdminRoute>
      <div className="flex flex-col min-h-screen">
        {/* Fixed Header */}
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
  
        <div className="flex flex-1 pt-16">
          {/* Sidebar */}
          <SideBar menuOpen={menuOpen} />
  
          {/* Main Content (Dashboard + Footer inside) */}
          <main className="flex-1 bg-gray-100 p-6 ml-0 md:ml-64 overflow-auto min-h-[calc(100vh-4rem)] flex flex-col">
            
            {/* Dashboard content */}
            <div className="flex-1">
              <SubscribedCustomerDetail />
            </div>
  
            {/* Footer INSIDE dashboard */}
            <Footer />
          </main>
        </div>
      </div>
      </ PrivateAdminRoute>
    );
}