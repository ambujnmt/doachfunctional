 

import React, { useState } from "react";    
import Event from "../components/Event/Event";

export default function contests() {
  const [menuOpen, setMenuOpen] = useState(false); 

  return (
    // <PrivateRoute>

    <div>  
        <Event /> 
    </div>
    // </PrivateRoute>
  );
}
