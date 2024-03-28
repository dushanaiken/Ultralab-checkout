import React, {useCallback, useEffect, useRef, useState} from "react";
import {Button, Card, Input, Typography} from "@material-tailwind/react";
import PatientServiceCenter from "../components/PatientServiceCenter";
import {
    useCreateOrderAndRetrieveTokenMutation, useLazyGetPatientAgreementQuery,
    useLazyGetPCSByZipAndRadiusQuery,
    useLazyGetTestListQuery,
    useMerchantLoginMutation
} from "../redux/services/UltaLab";
import {useAlert} from "react-alert";
import {useLocation} from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';
import {PatientDetailsPopup} from "../components/PatientDetailsPopup";
import {TextField, Tooltip} from "@mui/material";
import {useGetUserIPQuery} from "../redux/services/GeoLocation";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


export const Checkout = () => {

    const [merchantLogin, {data: tokenData, isLoading: isAuthenticating}] = useMerchantLoginMutation();
    const [createOrderAndRetrieveToken, {
        data: orderData,
        isLoading: isOrderCreating
    }] = useCreateOrderAndRetrieveTokenMutation();
    const [getPCSData, {data: pcsData, isLoading: isPCSLoading}] = useLazyGetPCSByZipAndRadiusQuery();
    const [getTestDetails, {data: testData, isLoading: isTestsLoading}] = useLazyGetTestListQuery();
    const [getAgreement, {data: patientAgreement}] = useLazyGetPatientAgreementQuery();
    const {data: userIPDetails} = useGetUserIPQuery();
    const alert = useAlert();
    const location = useLocation();

    const paymentGatewayForm = useRef(null);

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isAgreementAccepted, setIsAgreementAccepted] = useState(false);
    const [total, setTotal] = useState(0);
    const [drawFee, setDrawFee] = useState(0);
    const [zipCode, setZipCode] = useState('');
    const [radius, setRadius] = useState('');
    const [patientDetails, setPatientDetails] = useState({
        externalID: "164861864",
        firstName: "",
        lastName: "",
        gender: "M",
        dob: "",
        address1: "",
        city: "",
        state: "",
        email: "",
        cell: "",
        postalCode: ''
    });


    const TABLE_HEAD = ["Test name", "Quantity", "Price", ""];
    const queryParams = new URLSearchParams(location.search);
    const valuesParam = queryParams.get('ids');

    // Decoding the comma-separated value
    const valuesArray = valuesParam ? valuesParam.split(',').map(value => decodeURIComponent(value)) : [];


    useEffect(() => {
        const credentials = {
            grant_type: process.env.REACT_APP_ULTA_LAB_GRANT_TYPE,
            username: process.env.REACT_APP_ULTA_LAB_USER_NAME,
            password: process.env.REACT_APP_ULTA_LAB_USER_PASSWORD
        };
        let formBody = [];
        for (const property in credentials) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(credentials[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        merchantLogin(formBody);
    }, []);


    useEffect(() => {
        localStorage.setItem('token', tokenData?.access_token);
        if (tokenData?.access_token && valuesArray) {
            getTestDetails(valuesArray);
            getAgreement();
        }
    }, [tokenData]);

    useEffect(() => {
        setTotal(testData?.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0))
    }, [testData]);

    useEffect(() => {
        console.log('orderData', orderData)
        if (orderData?.formToken) {
            if (paymentGatewayForm.current) {
                paymentGatewayForm.current.submit();
            }

        }
    }, [orderData]);

    const onCreateOrder = () => {

        if (selectedIndex === -1) {
            alert.show('Please select patient service center')
            return;
        }


        const testItemsToBeSend = valuesArray.map(testId => {
            return {id: testId}
        })


        createOrderAndRetrieveToken({
                accountID: process.env.REACT_APP_ULTA_LAB_ACCOUNT_ID,
                ipAddress: "184.103.145.44",
                locationID: pcsData[selectedIndex]?.id,
                patientAgreementSigned: isAgreementAccepted,
                visitDate: "04/04/2024",
                patient: patientDetails,
                items: testItemsToBeSend,
                tokenRequest: {
                    cancelUrl: "https://test.com/packages",
                    finishUrl: "https://hellohealthnutrition.myshopify.com",
                    formBackgroundColor: "#8E44AD",
                    merchantName: "Hello Health Nutrition LLC dba Hello Health"
                }
            }
        );
    }


    return (
        <LoadingOverlay
            active={isPCSLoading || isTestsLoading || isAuthenticating || isOrderCreating}
            spinner
            text='Loading your content...'
        >
            <div className="flex gap-1 flex-col-reverse lg:flex-row mx-4">
                <Card
                    className="w-full lg:w-1/2 drop-shadow-xl rounded-lg p-4 flex  lg:flex-col  lg:h-dvh justify-between">
                    <div>
                        <h2 className="text-xl font-bold leading-7 text-gray-900 lg:truncate lg:text-2xl lg:tracking-tight">
                            Selected Lab tests

                        </h2>

                        <table className="w-full lg:min-w-max table-auto text-left mt-8 mb-12">
                            <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {testData?.map(({name, price}, index) => {
                                const isLast = index === testData?.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={name}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal overflow-hidden"
                                            >
                                                {name}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                1
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {price}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                as="a"
                                                href="#"
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium"
                                            >
                                                Edit
                                            </Typography>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex">
                            <Typography variant="h6" className="w-1/2">Sub total</Typography>
                            <Typography variant="h6" className="w-1/2 text-right">$ {total}</Typography>
                        </div>
                        <div className="flex mt-7">
                            <Typography variant="h6" className="w-1/2">Discount</Typography>
                            <Typography variant="h6" className="w-1/2 text-right">$ 0</Typography>
                        </div>
                        <div className="flex mt-7 justify-between">
                            <div className="flex">
                                <Typography variant="h6" className="w-full">Draw fee</Typography>
                                <Tooltip title={`Please Note:
                                    *The Draw Fee is a pre-paid fee charged once for each
                                    visit to the Patient Service Center to cover the actual drawing of the patient's
                                    blood and or collection of their specimen(s). There will be no charges to the
                                    patient at the Patient Service Center.`}
                                         className="ml-4">
                                    <InfoOutlinedIcon/>
                                </Tooltip>
                            </div>
                            <Typography variant="h6" className="w-1/2 text-right">$ {drawFee}</Typography>
                        </div>
                        <div className="flex mt-7">
                            <Typography variant="h5" className="w-1/2 font-extrabold">Total amount</Typography>
                            <Typography variant="h5"
                                        className="w-1/2 text-right font-extrabold">$ {total + drawFee}</Typography>
                        </div>
                        <PatientDetailsPopup onSubmit={onCreateOrder} patientDetails={patientDetails}
                                             setPatientDetails={setPatientDetails} patientAgreement={patientAgreement}
                                             isAgreementAccepted={isAgreementAccepted}
                                             setIsAgreementAccepted={setIsAgreementAccepted}/>


                    </div>

                </Card>
                <Card
                    className="w-full lg:w-1/2 mt-6 drop-shadow-xl shadow-md rounded-lg p-4  gap-4  flex flex-col h-screen">
                    <h2 className="text-xl font-bold leading-7 text-gray-900     lg:text-2xl lg:tracking-tight">
                        Select your Patient Service Center
                    </h2>
                    <div className="flex gap-4 mt-4 h-12 flex-col lg:flex-row">
                        <TextField label="Zip code" type='number' variant="outlined" value={zipCode}
                                   onChange={({target: {value}}) => {
                                       setZipCode(value
                                       )
                                   }} className="flex-initial w-full"/>

                        <TextField type='number' label="Radius" variant="outlined" value={radius}
                                   onChange={({target: {value}}) => {
                                       setRadius(value)
                                   }} className="flex-initial w-full"/>

                        <Button
                            className="h-full align-middle select-none" onClick={() => {
                            if (zipCode === "") alert.show('Enter your zip code')
                            else if (radius === '') alert.show('Enter radius to search');
                            else getPCSData({zipCode, radius})
                        }}>Search</Button>
                    </div>
                    {/*<div>*/}
                    {/*    <Card className="mt-6 h-56 text-center drop-shadow-xl rounded-lg p-4">*/}
                    {/*        Map*/}
                    {/*    </Card>*/}
                    {/*</div>*/}
                    <div className="mt-6 h-dvh overflow-y-scroll">
                        {pcsData?.map((PCSData, index) =>
                            (<PatientServiceCenter key={index} onClick={() => {
                                setSelectedIndex(index);
                                setDrawFee(PCSData?.price);
                            }}
                                                   isSelected={index === selectedIndex} PCSData={PCSData}/>)
                        )}
                    </div>
                </Card>
                <form ref={paymentGatewayForm} method="post" action="https://test.authorize.net/payment/payment"
                      id="formAuthorizeNetTestPage"
                      name="formAuthorizeNetTestPage">

                    <input type="hidden" name="token" value={orderData?.formToken}/>
                </form>

            </div>

        </LoadingOverlay>
    )
}
