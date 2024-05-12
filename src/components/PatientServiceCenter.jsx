import {Card, Typography} from "@material-tailwind/react";
import parse from 'html-react-parser';
import {Tooltip} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import React from "react";

export default function PatientServiceCenter({PCSData, isSelected, onClick}) {

    return (
        <Card
            onClick={onClick}
            className={`mt-6 border-2  drop-shadow-s rounded-lg p-4 box-size ${isSelected && "border-range-600"}`}>

            <div className="flex justify-between ">
                <Typography variant="h5" className="w-1/2 text-range-400">{PCSData?.name}</Typography>
                <div className="flex">
                    <Typography variant="h6" className="w-full">Draw fee ${PCSData.price}</Typography>
                    <Tooltip title={`Please Note:
                                    *The Draw Fee is a pre-paid fee charged once for each
                                    visit to the Patient Service Center to cover the actual drawing of the patient's
                                    blood and or collection of their specimen(s). There will be no charges to the
                                    patient at the Patient Service Center.`}
                             className="ml-4">
                        <InfoOutlinedIcon/>
                    </Tooltip>
                </div>
            </div>
            <Typography variant="paragraph"
                        className="mt-6">{PCSData?.address1}, {PCSData?.address2}, {PCSData?.city}</Typography>

            <Typography variant="paragraph" className="mt-2">Phone {PCSData?.phone}</Typography>
            <Typography variant="paragraph" className="mt-6">Hours</Typography>
            <div>{parse(PCSData.hours)}</div>

        </Card>
    );

}
