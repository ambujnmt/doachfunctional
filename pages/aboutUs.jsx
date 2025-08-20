 

import React, { useState } from "react";   
import AboutUs from "../components/AboutUs/AboutUs";

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false); 

  return (
    // <PrivateRoute>

    <div>  
        <AboutUs /> 
    </div>
    // </PrivateRoute>
  );
}
