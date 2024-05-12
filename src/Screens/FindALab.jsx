import React, { useState } from "react";
import { Button} from "@material-tailwind/react";
import PatientServiceCenter from "../components/PatientServiceCenter";
import { TextField } from "@mui/material"
import { useAlert } from "react-alert";

const FindALab = ({
    goToNextStep,
    zipCode,
    setZipCode,
    radius,
    setRadius,
    pcsData,
    getPCSData,
    selectedIndex,
    setDrawFee,
    setSelectedIndex,
}) => {

  const alert = useAlert();
  
  return (
        <>
          <h2 className="text-xl font-bold leading-7 text-gray-900 lg:text-2xl lg:tracking-tight">
            Select your Patient Service Center
          </h2>
          <div className="flex gap-4 mt-4  flex-col lg:flex-row">
            <TextField
              label="Zip code"
              type="number"
              variant="outlined"
              value={zipCode}
              onChange={({ target: { value } }) => {
                setZipCode(value);
              }}
              className="flex-initial lg:w-2/5 w-full"
            />

            <TextField
              type="number"
              label="Radius"
              variant="outlined"
              value={radius}
              onChange={({ target: { value } }) => {
                setRadius(value);
              }}
              className="flex-initial lg:w-2/5 w-full"
            />

            <Button
              className="h-full align-middle select-none search-btn lg:w-1/5 lg:ms-6 w-full ms-0"
              style={{}}
              onClick={() => {
                if (zipCode === "") {alert.show("Enter your zip code",{type: 'error',})}
                else if (radius === "") alert.show("Enter radius to search", {type: 'error',});
                else getPCSData({ zipCode, radius });
              }}
            >
              Search
            </Button>
          </div>
          <div className="mt-6 overflow-y-scroll wrap " >
            {pcsData?.map((PCSData, index) => (
              <PatientServiceCenter
                key={index}
                onClick={() => {
                  setSelectedIndex(index);
                  setDrawFee(PCSData?.price);
                }}
                isSelected={index === selectedIndex}
                PCSData={PCSData}
              />
            ))}
          </div>
          <div className="flex flex-col items-end  mt-6">
            <Button
             disabled={!(zipCode && radius && selectedIndex != '-1')}
             onClick={goToNextStep}
             className="w-40"
             >Next</Button>
          </div>
        </>
  );
};


export default FindALab;