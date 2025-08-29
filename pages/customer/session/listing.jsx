import React, { useState } from "react";    
import Header from "../../../components/Customer/Layouts/Header";
import Sidebar from "../../../components/Customer/Layouts/SideBar";
import Footer from "../../../components/Customer/Layouts/Footer";
import PrivateRoute from "../../../components/PrivateRoute/PrivateRoute";
import History from "../../../components/Customer/Session/History";

export default function listing() {
  const [menuOpen, setMenuOpen] = useState(false); 

  return (
    <PrivateRoute>
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <Sidebar menuOpen={menuOpen} />

        {/* Main Content (Dashboard + Footer inside) */}
        <main className="flex-1 bg-gray-100 p-6 ml-0 md:ml-64 overflow-auto min-h-[calc(100vh-4rem)] flex flex-col">
          
          {/* Dashboard content */}
          <div className="flex-1">
            <History />
          </div>

          {/* Footer INSIDE dashboard */}
          <Footer />
        </main>
      </div>
    </div>
    </PrivateRoute>
  );
}
