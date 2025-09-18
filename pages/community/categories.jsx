import React, { useState } from "react";   
import Category from "../../components/Community/Category";

export default function categories() {
  const [menuOpen, setMenuOpen] = useState(false); 

  return (
    // <PrivateRoute>

    <div>   
        <Category />  
    </div>
    // </PrivateRoute>
  );
}
