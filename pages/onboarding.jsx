 

import React, { useState } from "react";     
import Onboarding from "../components/Onboarding/Onboarding";

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false); 

  return (
    // <PrivateRoute>

    <div>  
        <Onboarding /> 
    </div>
    // </PrivateRoute>
  );
}
