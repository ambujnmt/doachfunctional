import React, { useState } from "react";   
import PaymentCancel from "../components/Page/PaymentCancel";


export default function paymentCancel() {
  const [menuOpen, setMenuOpen] = useState(false); 

  return (
    // <PrivateRoute>

    <div>   
        <PaymentCancel />  
    </div>
    // </PrivateRoute>
  );
}
