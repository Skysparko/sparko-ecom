import React, { useState } from "react";
import { MultiStepForm, Step } from "react-multi-form";
export default function Checkout() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div>
      <MultiStepForm activeStep={activeStep}>
        <Step label="one">
          <button
            onClick={() => {
              setActiveStep(activeStep + 1);
              console.log(activeStep);
            }}
          >
            next
          </button>
          <p>One</p>
        </Step>
        <Step label="Two">
          <button
            onClick={() => {
              setActiveStep(activeStep - 1);
            }}
          >
            prev
          </button>
          <button
            onClick={() => {
              setActiveStep(activeStep + 1);
            }}
          >
            next
          </button>
          <p>Two</p>
        </Step>
        <Step label="Three">
          <button
            onClick={() => {
              setActiveStep(activeStep - 1);
            }}
          >
            prev
          </button>

          <p>Three</p>
        </Step>
      </MultiStepForm>
    </div>
  );
}
