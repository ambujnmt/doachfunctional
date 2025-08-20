 

import React, { useState } from "react";
import SignUp from "../components/Forms/SignUp";

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false); 

  return (
    // <PrivateRoute>

    <div> 
        <SignUp />
    </div>
    // </PrivateRoute>
  );
}
 
