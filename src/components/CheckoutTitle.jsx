import React from "react";

function CheckoutTitle() {
  return(        
    <div className="mx-4 mt-2">
      <div className="checkout-title">
        <h1 className="text-3xl">Test Purchase</h1>
      </div>
      <div className="checkout-tab mt-2">
        <h6 className="checkout-tab-item text-sm">Test Purchase</h6>
        <h6 className="checkout-tab-item bold text-sm">{">"}</h6>
        <h6 className="checkout-tab-item bold text-sm">Product List</h6>
      </div>
    </div>    
  )
}

export default CheckoutTitle;