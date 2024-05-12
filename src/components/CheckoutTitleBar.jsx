import React from 'react';

function CheckoutTitleBar({
  status,  
  checkoutStatusList = [],
}) {
  return (
    <>
      <div className="menu">  
        {checkoutStatusList.map((item, index) => {
          return (
            <div className="menu-item">
              <div className="flex items-center">
                <div className={`circle ${item.step === status ? 'bg-orange': ''}`}>
                  <p className="text">{item.step}</p>
                </div>
                <div>
                  <p className={` text-sm hidden sm:block   menu-txt ${item.step === status ? 'text-orange': ''}`}>            
                    {item.text}
                  </p> 
                </div>
              </div>
              {index < (checkoutStatusList.length-1) ? <div className='title-bar-line'></div>: <div></div>}
            </div>
          )
        })}
      </div>
      <hr />
    </>
  )
}

export default CheckoutTitleBar;