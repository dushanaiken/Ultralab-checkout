import React from "react";
import {
   TextField,
   MenuItem,
   Select,
   InputLabel,
   FormControl,
} from "@mui/material";
import { Button } from "@material-tailwind/react";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

function PatientDetails({
   goToBackStep,
   onCreateOrder,
   patientDetails,
   setPatientDetails,
   isFillPatientDetails,
}) {
   const states = [
      { name: "Alabama", code: "AL" },
      { name: "Alaska", code: "AK" },
      { name: "Arizona", code: "AZ" },
      { name: "Arkansas", code: "AR" },
      { name: "California", code: "CA" },
      { name: "Colorado", code: "CO" },
      { name: "Connecticut", code: "CT" },
      { name: "Delaware", code: "DE" },
      { name: "Florida", code: "FL" },
      { name: "Georgia", code: "GA" },
      { name: "Hawaii", code: "HI" },
      { name: "Idaho", code: "ID" },
      { name: "Illinois", code: "IL" },
      { name: "Indiana", code: "IN" },
      { name: "Iowa", code: "IA" },
      { name: "Kansas", code: "KS" },
      { name: "Kentucky", code: "KY" },
      { name: "Louisiana", code: "LA" },
      { name: "Maine", code: "ME" },
      { name: "Maryland", code: "MD" },
      { name: "Massachusetts", code: "MA" },
      { name: "Michigan", code: "MI" },
      { name: "Minnesota", code: "MN" },
      { name: "Mississippi", code: "MS" },
      { name: "Missouri", code: "MO" },
      { name: "Montana", code: "MT" },
      { name: "Nebraska", code: "NE" },
      { name: "Nevada", code: "NV" },
      { name: "New Hampshire", code: "NH" },
      { name: "New Jersey", code: "NJ" },
      { name: "New Mexico", code: "NM" },
      { name: "New York", code: "NY" },
      { name: "North Carolina", code: "NC" },
      { name: "North Dakota", code: "ND" },
      { name: "Ohio", code: "OH" },
      { name: "Oklahoma", code: "OK" },
      { name: "Oregon", code: "OR" },
      { name: "Pennsylvania", code: "PA" },
      { name: "Rhode Island", code: "RI" },
      { name: "South Carolina", code: "SC" },
      { name: "South Dakota", code: "SD" },
      { name: "Tennessee", code: "TN" },
      { name: "Texas", code: "TX" },
      { name: "Utah", code: "UT" },
      { name: "Vermont", code: "VT" },
      { name: "Virginia", code: "VA" },
      { name: "Washington", code: "WA" },
      { name: "West Virginia", code: "WV" },
      { name: "Wisconsin", code: "WI" },
      { name: "Wyoming", code: "WY" },
   ];

   const currentDate = moment();
   const maxDate = moment(currentDate);
   const minDate = moment().subtract(100, "years");

   const formatPhoneNumber = (value) => {
      const digits = value.replace(/\D/g, "");
      let formatted = "";
      for (let i = 0; i < digits.length; i++) {
         if (i === 3) {
            formatted += "-";
         } else if (i === 6) {
            formatted += "-";
         }
         formatted += digits[i];
      }
      return formatted;
   };

   const handleChangeCell = (event) => {
      const { value } = event.target;
      if (value === "" || (/^[0-9-\b]+$/.test(value) && value.length <= 12)) {
         const formattedPhoneNumber = formatPhoneNumber(value);
         if (formattedPhoneNumber.length <= 15) {
            setPatientDetails({
               ...patientDetails,
               cell: formattedPhoneNumber,
            });
         }
      }
   };

   return (
      <>
         <div>
            <h2 className="text-xl  font-bold leading-7 text-gray-900 lg:truncate lg:text-xl lg:tracking-tight">
               Patient details
            </h2>
            <p className="text-sm">
               Please fill out this form with the person's information that will
               be getting these tests run
            </p>
            <div className="flex gap-4 mt-1  flex-col lg:flex-row">
               <TextField
                  label="First name"
                  variant="outlined"
                  value={patientDetails.firstName}
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
                  onChange={({ target: { value } }) => {
                     setPatientDetails({
                        ...patientDetails,
                        firstName: value,
                     });
                  }}
                  className="flex-initial w-full"
               />
               <TextField
                  label="Last name"
                  variant="outlined"
                  value={patientDetails.lastName}
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
                  onChange={({ target: { value } }) => {
                     setPatientDetails({
                        ...patientDetails,
                        lastName: value,
                     });
                  }}
                  className="flex-initial w-full"
               />
            </div>
            <div className="flex gap-4 mt-1  flex-col lg:flex-row">
               <TextField
                  type="email"
                  label="Email"
                  variant="outlined"
                  value={patientDetails.email}
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
                  onChange={({ target: { value } }) => {
                     setPatientDetails({
                        ...patientDetails,
                        email: value,
                     });
                  }}
                  className="flex-initial w-full"
               />
               <TextField
                  label="Mobile number"
                  variant="outlined"
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
                  value={patientDetails.cell}
                  onChange={handleChangeCell}
                  inputProps={{
                     inputMode: "numeric",
                     pattern: "[0-9]*",
                     maxLength: 12,
                  }}
                  className="flex-initial w-full"
               />
            </div>
            <div className="flex gap-4 mt-1  flex-col lg:flex-row">
               <FormControl fullWidth>
                  <InputLabel id="gender-select-label" className="!text-sm">
                     Gender
                  </InputLabel>
                  <Select
                     value={patientDetails.gender}
                     id="gender-select-label"
                     label="Gender"
                     onChange={({ target: { value } }) => {
                        setPatientDetails({
                           ...patientDetails,
                           gender: value,
                        });
                     }}
                     className="flex-initial w-full"
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
                     sx={{
                        fontWeight: 400,
                        fontSize: "14px",
                     }}
                  >
                     <MenuItem
                        value={"M"}
                        sx={{ fontSize: "14px" }}
                     >
                        Male
                     </MenuItem>
                     <MenuItem
                        value={"F"}
                        sx={{ fontSize: "14px" }}
                     >
                        Female
                     </MenuItem>
                  </Select>
               </FormControl>
               <FormControl fullWidth>
                  <DatePicker
                     label="Birthday"
                     minDate={minDate}
                     maxDate={maxDate}
                     InputLabelProps={{
                        sx: {
                           fontSize: "14px",
                        },
                     }}
                     sx={{
                        "& .MuiInputBase-root": {
                           fontSize: "14px",
                        },
                        "& .MuiOutlinedInput-root": {
                           fontSize: "14px",
                        },
                        "& .MuiInputBase-input": {
                           fontSize: "14px",
                           "&::placeholder": {
                              fontSize: "14px",
                           },
                        },
                        "& .MuiFormLabel-root": {
                           // Ensure the label font size is applied

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
                     className="flex-initial w-full !text-sm"
                     onChange={({ _d }) => {
                        setPatientDetails({
                           ...patientDetails,
                           dob: moment(_d).format("MM/DD/yyyy"),
                        });
                     }}
                  />
               </FormControl>
            </div>
            <div className="flex gap-4 mt-1 flex-col lg:flex-row">
               <TextField
                  label="Address"
                  variant="outlined"
                  value={patientDetails.address1}
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
                  onChange={({ target: { value } }) => {
                     setPatientDetails({
                        ...patientDetails,
                        address1: value,
                     });
                  }}
                  className="flex-initial w-full"
               />
               <TextField
                  label="Zip Code"
                  variant="outlined"
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
                  value={patientDetails.postalCode}
                  onChange={({ target: { value } }) => {
                     if (/^\d*$/.test(value)) {
                        setPatientDetails({
                           ...patientDetails,
                           postalCode: value,
                        });
                     }
                  }}
                  className="flex-initial w-full"
               />
            </div>
            <div className="flex gap-4 mt-1  flex-col lg:flex-row">
               <TextField
                  label="City"
                  variant="outlined"
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
                  value={patientDetails.city}
                  onChange={({ target: { value } }) => {
                     setPatientDetails({
                        ...patientDetails,
                        city: value,
                     });
                  }}
                  className="flex-initial w-full"
               />
               <FormControl fullWidth>
                  <InputLabel id="state-select-label" className="!text-sm">
                     State
                  </InputLabel>
                  <Select
                     value={patientDetails.state}
                     id="state-select-label"
                     label="State"
                     onChange={({ target: { value } }) => {
                        setPatientDetails({
                           ...patientDetails,
                           state: value,
                        });
                     }}
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
                     className="flex-initial w-full"
                     sx={{
                        fontWeight: 400,
                        fontSize: "14px",
                     }}
                  >
                     {states.map((state, index) => (
                        <MenuItem
                           key={index}
                           value={state.code}
                           sx={{ fontSize: "14px" }}
                        >
                           {state.name}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </div>
            <div className="flex  flex-row justify-end items-end my-6">
               <Button
                  onClick={goToBackStep}
                  className="back-btn me-6"
                  style={{ fontSize: 14, fontWeight: "400", borderRadius: 3 }}
               >
                  Back
               </Button>
               <Button
                  disabled={!isFillPatientDetails}
                  onClick={onCreateOrder}
                  style={{ fontSize: 14, fontWeight: "400", borderRadius: 3 }}
               >
                  Next
               </Button>
            </div>
         </div>
      </>
   );
}

export default PatientDetails;
