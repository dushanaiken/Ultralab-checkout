import {Card, Typography} from "@material-tailwind/react";
import parse from 'html-react-parser';

export default function PatientServiceCenter({PCSData, isSelected, onClick}) {

    return (
        <Card
            onClick={onClick}
            className={`mt-6 border-4  drop-shadow-s rounded-lg p-4  ${isSelected && "border-blue-600"}`}>

            <div className="flex">
                <Typography variant="h5" className="w-1/2 text-sky-400">{PCSData?.name}</Typography>
                {/*<Typography variant="h5" className="w-1/2 text-right">{PCSData.name}</Typography>*/}
            </div>
            <Typography variant="paragraph"
                        className="mt-6">{PCSData?.address1}, {PCSData?.address2}, {PCSData?.city}</Typography>

            <Typography variant="paragraph" className="mt-2">Phone {PCSData?.phone}</Typography>
            <Typography variant="paragraph" className="mt-6">Hours</Typography>
            <div>{parse(PCSData.hours)}</div>

        </Card>
    );

}
