
import React, { useState } from "react";    
import Dashboard from "../../components/Admin/Dashboard";

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false); 

  return (
    // <PrivateRoute>

    <div>  
        <Dashboard /> 
    </div>
    // </PrivateRoute>
  );
}
