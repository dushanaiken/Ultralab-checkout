import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import PatientServiceCenter from "../components/PatientServiceCenter";
import { TextField } from "@mui/material";
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
         <h2 className="text-xl font-bold leading-7 text-gray-900 lg:text-xl lg:tracking-tight">
            Select your Patient Service Center
         </h2>
         <div className="flex gap-4 mt-4  flex-col lg:flex-row">
            <TextField
               label="Zip code"
               variant="outlined"
               value={zipCode}
               onChange={({ target: { value } }) => {
                  if (/^\d*$/.test(value)) {
                     const numValue = Number(value);
                     if (numValue > 0) {
                        setZipCode(value);
                     } else if (value === "") {
                        setZipCode(value);
                     }
                  }
               }}
               className="flex-initial lg:w-2/5 w-full !font-sans"
               InputLabelProps={{
                  sx: {
                     fontSize: "14px",
                  },
               }}
               InputProps={{
                  sx: {
                     fontSize: "14px",
                     "& .MuiInputBase-input": {
                        fontSize: "14px",
                     },
                     "& .MuiInputBase-input::placeholder": {
                        fontSize: "14px",
                     },
                  },
               }}
            />

            <TextField
               label="Radius"
               variant="outlined"
               value={radius}
               onChange={({ target: { value } }) => {
                  if (/^\d*$/.test(value)) {
                     const numValue = Number(value);
                     if (numValue > 0) {
                        setRadius(value);
                     } else if (value === "") {
                        setRadius(value);
                     }
                  }
               }}
               className="flex-initial lg:w-2/5 w-full"
               InputLabelProps={{
                  sx: {
                     fontSize: "14px",
                  },
               }}
               InputProps={{
                  sx: {
                     fontSize: "14px",
                     "& .MuiInputBase-input": {
                        fontSize: "14px",
                     },
                     "& .MuiInputBase-input::placeholder": {
                        fontSize: "14px",
                     },
                  },
               }}
            />

            <Button
               className="h-full align-middle select-none search-btn lg:w-1/5 lg:ms-6 w-full ms-0"
               style={{ fontSize: 14, fontWeight: "400", borderRadius: 3 }}
               onClick={() => {
                  if (zipCode === "") {
                     alert.show("Enter your zip code", { type: "error" });
                  } else if (radius === "")
                     alert.show("Enter radius to search", { type: "error" });
                  else getPCSData({ zipCode, radius });
               }}
            >
               Search
            </Button>
         </div>
         <div className="mt-6 overflow-y-scroll wrap ">
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
               disabled={!(zipCode && radius && selectedIndex != "-1")}
               onClick={goToNextStep}
               className="w-40"
               style={{ fontSize: 14, fontWeight: "400", borderRadius: 3 }}
            >
               Next
            </Button>
         </div>
      </>
   );
};

export default FindALab;