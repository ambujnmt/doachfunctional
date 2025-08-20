 

import React, { useState } from "react";   
import Community from "../components/Community/Community";

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false); 

  return (
    // <PrivateRoute>

    <div>   
        <Community />  
    </div>
    // </PrivateRoute>
  );
}
