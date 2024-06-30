import React, { useEffect, useRef, useState } from "react";
import { Card } from "@material-tailwind/react";
import {
  useCreateOrderAndRetrieveTokenMutation,
  useLazyGetPatientAgreementQuery,
  useLazyGetPCSByZipAndRadiusQuery,
  useLazyGetTestListQuery,
  useMerchantLoginMutation,
} from "../redux/services/UltaLab";
import { useAlert } from "react-alert";
import { useLocation } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import { useGetUserIPQuery } from "../redux/services/GeoLocation";
import CheckoutTitleBar from "../components/CheckoutTitleBar";
import CheckoutTitle from "../components/CheckoutTitle";
import TestProductTable from "../Screens/TestProductTable"
import FindALab from "./FindALab";
import ThirdParty from "./ThirdParty";
import PatientDetails from "./PatientDetails";
import styles from "./checkout.css";

export const Checkout = () => {

  const checkoutStatusList = [
    { "step": "01", "text": "Find a Lab", Component: FindALab },
    { "step": "02", "text": "UltaLabs Terms", Component: ThirdParty },
    { "step": "03", "text": "Patient Details", Component: PatientDetails },
    { "step": "04", "text": "Order & Payment" },    
  ]  
  const [currentCheckoutStatus, setCurrentCheckoutStatus ] = useState(checkoutStatusList[0].step)   
  const ActiveComponent = checkoutStatusList.find(step => step.step === currentCheckoutStatus)?.Component;
  const goToNextStep = () => {    
    const currentIndex = checkoutStatusList.findIndex((step) => step.step === currentCheckoutStatus)    
    setCurrentCheckoutStatus(checkoutStatusList[currentIndex + 1].step)
  }
  const goToBackStep = () => {
    const currentIndex = checkoutStatusList.findIndex((step) => step.step === currentCheckoutStatus)    
    setCurrentCheckoutStatus(checkoutStatusList[currentIndex - 1].step)
  }
  const [merchantLogin, { data: tokenData, isLoading: isAuthenticating }] =
    useMerchantLoginMutation();
  const [
    createOrderAndRetrieveToken,
    { data: orderData, isLoading: isOrderCreating, error: orderError },
  ] = useCreateOrderAndRetrieveTokenMutation();
  const [getPCSData, { data: pcsData, isLoading: isPCSLoading, error: pcsDataError }] =
    useLazyGetPCSByZipAndRadiusQuery();
  const [getTestDetails, { data: testData, isLoading: isTestsLoading }] =
    useLazyGetTestListQuery();
  const [getAgreement, { data: patientAgreement }] =
    useLazyGetPatientAgreementQuery();
  const { data: userIPDetails } = useGetUserIPQuery();
  const alert = useAlert();
  const location = useLocation();
  const paymentGatewayForm = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isAgreementAccepted, setIsAgreementAccepted] = useState(false);
  const [total, setTotal] = useState(0);
  const [drawFee, setDrawFee] = useState(0);  
  const [zipCode, setZipCode] = useState("");
  const [radius, setRadius] = useState("");
  const [patientDetails, setPatientDetails] = useState({
    externalID: "164861864",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",    
    address1: "",
    city: "",
    state: "",
    email: "",
    cell: "",
    postalCode: "",
  });
  const [isFillPatientDetails, setIsFillPatientDetails] = useState(false)
  const isAnyFieldEmpty = (obj) => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];            
            if (value === '') {
                return true; 
            }
        }
    }
    return false;
  }
  useEffect(()=>{
    if(isAnyFieldEmpty(patientDetails)){
      setIsFillPatientDetails(false)
    }else{
      setIsFillPatientDetails(true)
    }
  },[patientDetails]) 

  const queryParams = new URLSearchParams(location.search);
  const valuesParam = queryParams.get("ids");
  // Decoding the comma-separated value
  const valuesArray = valuesParam
    ? valuesParam.split(",").map((value) => decodeURIComponent(value))
    : [];

  useEffect(() => {
    const credentials = {
      grant_type: process.env.REACT_APP_ULTA_LAB_GRANT_TYPE,
      username: process.env.REACT_APP_ULTA_LAB_USER_NAME,
      password: process.env.REACT_APP_ULTA_LAB_USER_PASSWORD,
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
    localStorage.setItem("token", tokenData?.access_token);
    if (tokenData?.access_token && valuesArray) {
      getTestDetails(valuesArray);
      getAgreement();
    }
  }, [tokenData]);

  useEffect(() => {
    setTotal(
      testData?.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0
      )
    );
  }, [testData]);

  useEffect(() => { 
    if (orderData?.formToken) {
      if (paymentGatewayForm.current) {
        paymentGatewayForm.current.submit();
      }
    }
  }, [orderData]);

  useEffect(() => {
        if(orderError){
          const { status, data } = orderError;
          if(status && status === 422){
            const { errors } = data;
            if(errors){
              const obj = errors[0]
              if(obj && obj?.field === 'PostalCode' && obj?.messages){            
                alert.show(obj.messages, {type: 'error'})            
              }
            }
          } else if(status && status === 500){
            const { responseMessage } = data;
            if(responseMessage){
              alert.show(responseMessage, {type: 'error'})            
            }
          }
        }
  }, [orderError])

  useEffect(() => {
    if(pcsDataError){
      const { status, data } = pcsDataError;
      if(status && status === 404){
          const { errors } = data;
          if(errors){
            const error = errors[0]
            alert.show(error, {type: 'error'})            
          }
      } else if(status && status === 422){
        const { errors } = data;
        if(errors){
          const obj = errors[0]
          if(obj && obj?.field === 'distance' && obj?.messages){            
            alert.show(obj.messages, {type: 'error'})            
          }
        }
      }
    }
  }, pcsDataError )

  const validateEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }
  const validateUSPhoneNumber = (number) => {
    const regex = /^\d{3}-\d{3}-\d{4}$/;
    return regex.test(number);
  }
  const validateBirthday = (date) => {  
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/;
    return regex.test(date)
  }
  const onCreateOrder = () => {
    if (selectedIndex === -1) {
      alert.show('Please select patient service center', {type: 'error',})
      return;
    }
    const { email, cell, dob } = patientDetails;
    if(!validateEmail(email)){
      alert.show(`Invalid Email Format`, {type: 'error',})
      return;
    }
    if(!validateUSPhoneNumber(cell)){
      alert.show(`Invalid Mobile Number`,{type: 'error',})
      return;
    }
    if(!validateBirthday(dob)){
      alert.show(`Invalid Birthday`, {type: 'error',})
      return;
    }
    const testItemsToBeSend = valuesArray.map((testId) => {
      return { id: testId };
    });
    const patientDetailsWithFormat = {
      ...patientDetails,
      cell : patientDetails.cell.replace(/\D/g, '')
    }


    const today = new Date();
    const formattedToday = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

createOrderAndRetrieveToken({
      accountID: process.env.REACT_APP_ULTA_LAB_ACCOUNT_ID,
      ipAddress: "184.103.145.44" , // TODO -> userIPDetails?.IPv4,
      locationID: pcsData[selectedIndex]?.id,
      patientAgreementSigned: isAgreementAccepted,
      visitDate: formattedToday, // TODO : Should discussed 
      patient: patientDetailsWithFormat,
      items: testItemsToBeSend,
      tokenRequest: {
        cancelUrl: process.env.REACT_APP_PAYMENT_CANCEL_URL,
        finishUrl: process.env.REACT_APP_PAYMENT_FINISH_URL,
        formBackgroundColor: "#8E44AD",
        merchantName: "Hello Health Nutrition LLC dba Hello Health",
      },
    });
  };
  
  return (
    <LoadingOverlay
      active={
        isPCSLoading || isTestsLoading || isAuthenticating || isOrderCreating
      }
      spinner
      text="Loading your content..."
    >
      <CheckoutTitle />

      <div className="flex gap-1 flex-col lg:flex-row">
        <Card className="w-full mt-6 rounded-lg p-4  gap-4  flex flex-col patient-service checkout-card-height" >
          <CheckoutTitleBar checkoutStatusList={checkoutStatusList} status={currentCheckoutStatus}/>
          
          {
            ActiveComponent ?  
              <ActiveComponent  
                goToBackStep={goToBackStep}
                goToNextStep={goToNextStep} 
                setSelectedIndex={setSelectedIndex} 
                zipCode={zipCode}
                setZipCode={setZipCode}
                radius={radius}                
                setRadius={setRadius}
                pcsData ={pcsDataError ? [] : pcsData}
                getPCSData={getPCSData}
                selectedIndex={selectedIndex}
                setDrawFee={setDrawFee}
                patientAgreement={patientAgreement}
                isAgreementAccepted={isAgreementAccepted}
                setIsAgreementAccepted={setIsAgreementAccepted}
                patientDetails={patientDetails}
                setPatientDetails={setPatientDetails}
                isFillPatientDetails={isFillPatientDetails}                
                onCreateOrder={onCreateOrder}
                /> : 
              null 
          }          
        </Card>
        <TestProductTable testData={testData} total={total} drawFee={drawFee}/>    
      </div>
      <form 
        ref={paymentGatewayForm} 
        method="post" 
        action={process.env.REACT_APP_PAYMENT_AUTHORIZE_NET_PAYMENT_URL}
        id="formAuthorizeNetTestPage"
        name="formAuthorizeNetTestPage">
        <input type="hidden" name="token" value={orderData?.formToken}/>
      </form>
    </LoadingOverlay>
  );
};
