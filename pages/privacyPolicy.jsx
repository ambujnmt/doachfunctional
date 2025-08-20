 

import React, { useState } from "react";     
import PrivacyPolicy from "../components/PrivacyPolicy/PrivacyPolicy";

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false); 

  return (
    // <PrivateRoute>

    <div>  
        <PrivacyPolicy /> 
    </div>
    // </PrivateRoute>
  );
}
