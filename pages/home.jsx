 

import React, { useState } from "react"; 
import Home from "../components/HomePage/Home";
import HomeHeader from "../components/HomePage/HomeHeader";
import HomeFooter from "../components/HomePage/HomeFooter";

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false); 

  return (
    // <PrivateRoute>

    <div> 
        {/* <HomeHeader /> */}
        <Home />
        {/* <HomeFooter /> */}
    </div>
    // </PrivateRoute>
  );
}
