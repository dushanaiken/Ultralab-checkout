import React from "react";
import { TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Button } from "@material-tailwind/react";
import {DatePicker} from "@mui/x-date-pickers";
import moment from "moment";

function PatientDetails({
  goToBackStep,
  onCreateOrder,
  patientDetails,
  setPatientDetails,
  isFillPatientDetails,  
}) {

    const states = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
        'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
        'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];

    const currentDate = moment(); 
    const maxDate = moment(currentDate);
    const minDate = moment().subtract(100, 'years'); 
    
    const formatPhoneNumber = (value) => {
        const digits = value.replace(/\D/g, '');
        let formatted = '';
        for (let i = 0; i < digits.length; i++) {
            if (i === 3) {
                formatted += '-';
            } else if (i === 6) {
                formatted += '-';
            }
            formatted += digits[i];
        }                
        return formatted;
    };

    const handleChangeCell = (event) => {
        const { value } = event.target;        
        if (value === '' || /^[0-9-\b]+$/.test(value) && value.length <= 12) {
            const formattedPhoneNumber = formatPhoneNumber(value);
            if (formattedPhoneNumber.length <= 15) {                
                setPatientDetails({
                    ...patientDetails,
                    cell: formattedPhoneNumber
                })
            }            
        }
    };
  
  return (
    <>
       <div>
          <h2 className="text-xl  font-bold leading-7 text-gray-900 lg:truncate lg:text-2xl lg:tracking-tight">
              Patient details
          </h2>
          <p>Please fill out this form with the person's information that will be getting these tests run</p>
          <div className="flex gap-4 mt-1  flex-col lg:flex-row">
              <TextField label="First name" variant="outlined" value={patientDetails.firstName}
                          onChange={({target: {value}}) => {
                              setPatientDetails({
                                  ...patientDetails,
                                  firstName: value
                              })
                          }} className="flex-initial w-full"/>
              <TextField label="Last name" variant="outlined" value={patientDetails.lastName}
                          onChange={({target: {value}}) => {
                              setPatientDetails({
                                  ...patientDetails,
                                  lastName: value
                              })
                          }}
                          className="flex-initial w-full"/>

          </div>
          <div className="flex gap-4 mt-1  flex-col lg:flex-row">
              <TextField type='email' label="Email" variant="outlined" value={patientDetails.email}
                          onChange={({target: {value}}) => {
                              setPatientDetails({
                                  ...patientDetails,
                                  email: value
                              })
                          }} className="flex-initial w-full"/>                                    
              <TextField               
                    label="Mobile number" 
                    variant="outlined"
                    value={patientDetails.cell} 
                    onChange={handleChangeCell} 
                    inputProps={{
                        inputMode: 'numeric', 
                        pattern: '[0-9]*',
                        maxLength: 12
                    }}
                    className="flex-initial w-full"/>
          </div>
          <div className="flex gap-4 mt-1  flex-col lg:flex-row">
                <FormControl fullWidth>
                  <InputLabel id="gender-select-label">Gender</InputLabel>
                  <Select
                      value={patientDetails.gender}
                      id='gender-select-label'
                      label="Gender"
                      onChange={({target: {value}}) => {
                          setPatientDetails({
                              ...patientDetails,
                              gender: value
                          })
                      }}
                      className="flex-initial w-full"
                  >                                            
                      <MenuItem value={'M'}>Male</MenuItem>
                      <MenuItem value={'F'}>Female</MenuItem>
                  </Select>
              </FormControl>              
              <FormControl fullWidth>
              <DatePicker label="Birthday" 
                    minDate={minDate}
                    maxDate={maxDate}
              className="flex-initial w-full" onChange={({_d}) => {
                  setPatientDetails({
                      ...patientDetails,
                      dob: moment(_d).format('MM/DD/yyyy')
                  });
              }}/>
              </FormControl>
          </div>
          <div className="flex gap-4 mt-1  flex-col lg:flex-row">
              <TextField label="Address" variant="outlined" value={patientDetails.address1}
                          onChange={({target: {value}}) => {
                              setPatientDetails({
                                  ...patientDetails,
                                  address1: value
                              })
                          }} className="flex-initial w-full"/>
              <TextField label="Zip Code" variant="outlined" value={patientDetails.postalCode}
                          onChange={({target: {value}}) => {
                              setPatientDetails({
                                  ...patientDetails,
                                  postalCode: value
                              })
                          }} className="flex-initial w-full"/>

          </div>
          <div className="flex gap-4 mt-1  flex-col lg:flex-row">
              <TextField label="City" variant="outlined" value={patientDetails.city}
                          onChange={({target: {value}}) => {
                              setPatientDetails({
                                  ...patientDetails,
                                  city: value
                              })
                          }} className="flex-initial w-full"/>
              <FormControl fullWidth>
                  <InputLabel id="state-select-label">State</InputLabel>
                  <Select
                      value={patientDetails.state}
                      id='state-select-label'
                      label="State"
                      onChange={({target: {value}}) => {
                          setPatientDetails({
                              ...patientDetails,
                              state: value
                          })
                      }}
                      className="flex-initial w-full"
                  >                                            
                      {states.map((state, index) => (<MenuItem key={index} value={state}>{state}</MenuItem>))}
                  </Select>
              </FormControl>              
          </div>
          <div className="flex  flex-row justify-end items-end mt-6">
                  <Button                  
                    onClick={goToBackStep} className="back-btn me-6">Back</Button>          
                  <Button               
                    disabled={!isFillPatientDetails} 
                    onClick={onCreateOrder}
                  >Next</Button>          
          </div>
      </div>
    </>
  )
}

export default PatientDetails;
