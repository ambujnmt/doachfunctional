 

import React, { useState } from "react";    
import Event from "../components/Event/Event";
import ContactUs from "../components/ContactUs/ContactUs";

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false); 

  return (
    // <PrivateRoute>

    <div>  
        <ContactUs /> 
    </div>
    // </PrivateRoute>
  );
}
