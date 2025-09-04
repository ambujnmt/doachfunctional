import React, { useState } from "react";   
import PaymentSuccess from "../components/Page/PaymentSuccess";


export default function paymentSuccess() {
  const [menuOpen, setMenuOpen] = useState(false); 

  return (
    // <PrivateRoute>

    <div>   
        <PaymentSuccess />  
    </div>
    // </PrivateRoute>
  );
}
