 

import React, { useState } from "react";   
import SubscriptionCheckout from "../components/Page/SubscriptionCheckout";


export default function subscriptionCheckout() {
  const [menuOpen, setMenuOpen] = useState(false); 

  return (
    // <PrivateRoute>

    <div>   
        <SubscriptionCheckout />  
    </div>
    // </PrivateRoute>
  );
}
