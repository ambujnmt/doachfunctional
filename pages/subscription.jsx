 

import React, { useState } from "react";   
import Subscription from "../components/Page/Subscription";


export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false); 

  return (
    // <PrivateRoute>

    <div>   
        <Subscription />  
    </div>
    // </PrivateRoute>
  );
}
