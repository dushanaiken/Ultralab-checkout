import React, {useState} from 'react';
import Popup from 'reactjs-popup';
import {Button, Card, Typography} from "@material-tailwind/react";
import {Checkbox, MenuItem, Select, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import moment from "moment";
import parse from 'html-react-parser';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export const PatientDetailsPopup = ({
                                        onSubmit,
                                        patientDetails,
                                        setPatientDetails,
                                        isAgreementAccepted,
                                        setIsAgreementAccepted,
                                        patientAgreement
                                    }) => {
    const [agreeStatus, setAgreeStatus] = useState(false);
    return (

        <Popup
            trigger={(isOpen) => {
                return (<Button
                    className="mt-7 self-end align-middle select-none font-sansavantri0.xyz
                        font-bold text-center uppercase transition-all disabled:opacity-50
                        disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6
                        rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10
                        hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85]
                        focus:shadow-none active:opacity-[0.85] active:shadow-none">Checkout</Button>)
            }}
            modal
            nested
            lockScroll={false}
            overlayStyle={{background: 'rgba(25,31,29,0.31)', zIndex: 10}}
            contentStyle={{height: '70%', width: '80%'}}
            onClose={() => {
                setIsAgreementAccepted(false);
                setAgreeStatus(false);
            }}


        >
            {close => (
                <Card
                    className="bg-white  mt-6 drop-shadow-xl shadow-md rounded-lg p-4  gap-4  flex flex-col  w-6/12 h-full ms-auto	 me-auto ps-auto	 pe-auto	">
                    < CloseOutlinedIcon onClick={() => {
                        console.log('closing')
                        close()
                    }} className="self-end hover:cursor-pointer"/>
                    {isAgreementAccepted ? <div className="flex gap-4 flex-col justify-between h-full">
                            <div>
                                <h2 className="text-l text-center font-bold leading-7 text-gray-900 lg:truncate lg:text-xl lg:tracking-tight">
                                    Patient details

                                </h2>
                                <div className="flex gap-4 mt-6  flex-col lg:flex-row">
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
                                <div className="flex gap-4 mt-6 h-12 flex-col lg:flex-row">
                                    <TextField type='email' label="Email" variant="outlined" value={patientDetails.email}
                                               onChange={({target: {value}}) => {
                                                   setPatientDetails({
                                                       ...patientDetails,
                                                       email: value
                                                   })
                                               }} className="flex-initial w-full"/>
                                    <TextField type='number' label="Mobile number" variant="outlined"
                                               value={patientDetails.cell} onChange={({target: {value}}) => {
                                        setPatientDetails({
                                            ...patientDetails,
                                            cell: value
                                        })
                                    }} className="flex-initial w-full"/>
                                </div>
                                <div className="flex gap-4 mt-6 h-12 flex-col lg:flex-row">
                                    <div className="flex-initial w-full">

                                        <Select
                                            value={patientDetails.gender}
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
                                    </div>
                                    <DatePicker label="Birthday" className="flex-initial w-full" onChange={({_d}) => {
                                        setPatientDetails({
                                            ...patientDetails,
                                            dob: moment(_d).format('MM/DD/yyyy')
                                        });
                                    }}/>
                                </div>
                                <div className="flex gap-4 mt-6 h-12 flex-col lg:flex-row">
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
                                <div className="flex gap-4 mt-6 h-12 flex-col lg:flex-row">
                                    <TextField label="City" variant="outlined" value={patientDetails.city}
                                               onChange={({target: {value}}) => {
                                                   setPatientDetails({
                                                       ...patientDetails,
                                                       city: value
                                                   })
                                               }} className="flex-initial w-full"/>
                                    <TextField label="State" variant="outlined" value={patientDetails.state}
                                               onChange={({target: {value}}) => {
                                                   setPatientDetails({
                                                       ...patientDetails,
                                                       state: value
                                                   })
                                               }} className="flex-initial w-full"/>
                                </div>
                            </div>
                            <Button
                                className="mt-7 self-end align-middle select-none font-sans
                                font-bold text-center uppercase transition-all disabled:opacity-50
                                disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6
                                rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10
                        hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85]
                        focus:shadow-none active:opacity-[0.85] active:shadow-none" onClick={onSubmit}>Continue</Button>
                        </div> :
                        patientAgreement &&
                        <div className="flex gap-4 mt-4 flex-col overflow-scroll">
                            <div className="overflow-auto h-full">{parse(patientAgreement.html)}</div>
                            <div className="flex items-center">
                                <Checkbox onChange={({target: {checked}}) => {
                                    setAgreeStatus(checked)
                                }}/>
                                <Typography
                                    className="font-semibold text-lg">I
                                    read and agreed the terms and conditions</Typography></div>
                            <Button
                                className="mt-7 self-end" disabled={!agreeStatus}
                                onClick={() => {
                                    setIsAgreementAccepted(agreeStatus)
                                }}>Continue</Button>
                        </div>}

                </Card>

            )}

        </Popup>
    )
};

