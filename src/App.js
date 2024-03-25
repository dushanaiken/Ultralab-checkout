import {Checkout} from "./Screens/Checkout";
import {Route, Routes} from "react-router-dom";
import {transitions, positions, Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";

const options = {
    position: positions.TOP_RIGHT, timeout: 5000, offset: '30px',
    transition: transitions.SCALE
}

export default function App() {
    return (<LocalizationProvider dateAdapter={AdapterMoment}>
        <AlertProvider template={AlertTemplate} {...options}>
            <Routes>
                <Route path="/checkout" element={<Checkout/>}/>
            </Routes>
        </AlertProvider></LocalizationProvider>)
}
