import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const TestProductTable = ({
    testData = [],
    drawFee = 0,
    total = 0,
}) => {

    const TABLE_HEAD = ["Third - Party Services", "Quantity", "Price"];

  return (
        <Card className="rounded-lg p-4 flex  lg:flex-col  lg:h-dvh justify-between total-amount">
          <div>
            <table className="w-full lg:min-w-max table-auto text-left">
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
                {testData?.map(({ name, price }, index) => {
                  const isLast = index === testData?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-blue-gray-50";

                  return (
                    <tr key={name}>
                      <td className={classes} style={{maxWidth: 250}}>
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex flex-col p-4">
              <div className="flex">
                <Typography variant="h6" className="w-1/2">
                  Sub total
                </Typography>
                <Typography variant="h6" className="w-1/2 text-right">
                  $ {total}
                </Typography>
              </div>
              <div className="flex mt-7">
                <Typography variant="h6" className="w-1/2">
                  Discount
                </Typography>
                <Typography variant="h6" className="w-1/2 text-right">
                  $ 0
                </Typography>
              </div>
              <div className="flex mt-7 justify-between">
                <div className="flex">
                  <Typography variant="h6" className="w-full">
                    Draw fee
                  </Typography>
                  <Tooltip
                    title={`Please Note:
                                    *The Draw Fee is a pre-paid fee charged once for each
                                    visit to the Patient Service Center to cover the actual drawing of the patient's
                                    blood and or collection of their specimen(s). There will be no charges to the
                                    patient at the Patient Service Center.`}
                    className="ml-4"
                  >
                    <InfoOutlinedIcon />
                  </Tooltip>
                </div>
                <Typography variant="h6" className="w-1/2 text-right">
                  $ {drawFee}
                </Typography>
              </div>
              <div className="flex mt-7">
                <Typography variant="h5" className="w-1/2 font-extrabold">
                  Total amount
                </Typography>
                <Typography
                  variant="h5"
                  className="w-1/2 text-right font-extrabold"
                >
                  $ {total + drawFee}
                </Typography>
              </div>
            </div>
          </div>
        </Card>
  );
};


export default TestProductTable;