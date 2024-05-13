import React from "react";
import { Button } from "@material-tailwind/react";
import parse from 'html-react-parser';

function ThirdParty({
  goToBackStep,
  goToNextStep,
  patientAgreement,
  isAgreementAccepted,
  setIsAgreementAccepted,
}) {


  const handleCheckboxChange = () => {    
    setIsAgreementAccepted(!isAgreementAccepted)
  }


  return (
    <>
     
          <h2 className="text-xl font-bold leading-7 text-gray-900     lg:text-2xl lg:tracking-tight">
            Patient Terms and Conditions
          </h2>          
          <div className="flex gap-4 mt-4  flex-col lg:flex-row agreement-box overflow-y-scroll">            
            <div>              
              {patientAgreement && <div className=" h-full text-sm md:text-lg">{parse(patientAgreement.html)}</div>}
            </div>
          </div>
          <div className="mt-3">
              <input
                type="checkbox"
                checked={isAgreementAccepted}
                onChange={handleCheckboxChange}
                className="me-4"
              />
              I have read and agree to the Terms and Conditions
            </div>
          <div className="flex flex-row justify-end items-end mt-6">
                <Button                  
                  onClick={goToBackStep} className="back-btn me-6">Back</Button>          
                <Button   
                  disabled={!isAgreementAccepted}               
                  onClick={goToNextStep}
                >Next</Button>          
          </div>
    </>
  )
}

export default ThirdParty;
