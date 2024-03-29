import {Button, Typography} from "@material-tailwind/react";
import React from "react";
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';

export const OrderSuccess = () => {


    return (
        <div className="flex flex-col justify-center items-center w-full h-screen p-10">
            <CheckCircleTwoToneIcon color="success" style={{fontSize: 80}}/>
            <Typography className="font-semibold text-4xl uppercase mt-5">Thank you for your purchase</Typography>
            <Typography className="font-medium text-l uppercase mt-5">Your order number is: </Typography>
            <Typography className="font-bold text-xl uppercase text-center mt-5">We'll email the requisition note
                pdf.</Typography>
            <Typography className="font-bold text-xl uppercase text-center mt-5">Please bring it
                with you when you visit our patient service center on the test date.</Typography>
            <Button className="mt-5 bg-orange-600"
                    onClick={() => window.location.href = 'https://www.gethellohealth.com/'}>Continue Shopping</Button>
        </div>
    );

};
