import React, { useState } from "react";
import { MultiStepForm, Step } from "react-multi-form";
import Payment from "../pages/checkout/Payment";
import Address from "../pages/checkout/Address";
import Review from "../pages/checkout/Review";
export default function Checkout() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="py-10 px-20 ">
      <MultiStepForm activeStep={activeStep} accentColor="rgb(2 132 199 / 1)">
        <Step label="Delivery Address">
          <Address setActiveStep={setActiveStep} />
        </Step>
        <Step label="Payment Details">
          <Payment setActiveStep={setActiveStep} />
        </Step>
        <Step label="Order Review">
          {/* <Review setActiveStep={setActiveStep}/> */}
        </Step>
      </MultiStepForm>
    </div>
  );
}
