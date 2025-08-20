 
import React, { useState } from "react"; 
import Login from "../components/Forms/Login";

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false); 

  return (
    // <PrivateRoute>

    <div> 
        <Login />
    </div>
    // </PrivateRoute>
  );
}
 
