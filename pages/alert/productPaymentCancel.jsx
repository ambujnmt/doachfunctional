import React, { useState } from "react";   
import PaymentCancel from "../../components/HomePage/Product/PaymentCancel";


export default function paymentSuccess() {
  const [menuOpen, setMenuOpen] = useState(false); 

  return (
    // <PrivateRoute>

    <div>   
        <PaymentCancel />  
    </div>
    // </PrivateRoute>
  );
}