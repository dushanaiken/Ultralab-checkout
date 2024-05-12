import React from "react";

function CheckoutTitle() {
  return(        
    <div className="mx-4">
      <div className="checkout-title">
        <h1>Test Purchase</h1>
      </div>
      <div className="checkout-tab">
        <h6 className="checkout-tab-item">Test Purchase</h6>
        <h6 className="checkout-tab-item bold">{">"}</h6>
        <h6 className="checkout-tab-item bold">Product List</h6>
      </div>
    </div>    
  )
}

export default CheckoutTitle;