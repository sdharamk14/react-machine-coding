import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const STEPS = {
  [1]: Step1,
  [2]: Step2,
  [3]: Step3,
};

type PersonalInformationProps = {
  name: string;
  email: string;
  onChange: (step: number, name: string, val: string) => void;
  step: number;
};

type ContactInformationProps = {
  phone: string;
  city: string;
  onChange: (step: number, name: string, val: string) => void;
  step: number;
};

type FinancialInformationProps = {
  salary: string;
  bank: string;
  onChange: (step: number, name: string, val: string) => void;
  step: number;
};

export type MultiStepFormProps =
  | PersonalInformationProps
  | ContactInformationProps
  | FinancialInformationProps;

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  console.log("🚀 ~ MultiStepForm ~ currentStep:", currentStep);
  const [fields, setFields] = useState({
    [1]: {
      name: "",
      email: "",
    },
    [2]: {
      phone: "",
      city: "",
    },
    [3]: {
      salary: "",
      bank: "",
    },
  });
  console.log("🚀 ~ MultiStepForm ~ fields:", fields);

  const isLast = currentStep >= 3;

  const handleNext = () => {
    const updatedActiveForm = currentStep + 1;
    if (updatedActiveForm <= 3) {
      setCurrentStep(updatedActiveForm);
    } else {
      alert(JSON.stringify(fields));
    }
  };

  const handlePrevious = () => {
    const updatedActiveForm = currentStep - 1;
    if (updatedActiveForm !== 1) {
      // initial form page
    } else {
      //   setCurrentStep(updatedActiveForm);
    }
    setCurrentStep(updatedActiveForm);
  };

  const getStepComponent = () => {
    return STEPS[currentStep as keyof typeof STEPS];
  };

  const Component = getStepComponent();

  const handleChange = (step: number, name: string, val: string) => {
    setFields((prev) => {
      return {
        ...prev,
        [step]: {
          ...prev[step as keyof typeof prev],
          [name]: val,
        },
      };
    });
  };

  return (
    <div className="multi-step-form">
      <div>
        <Component
          step={currentStep}
          onChange={handleChange}
          {...fields[currentStep as keyof typeof fields]}
        />
      </div>
      <div>
        {currentStep !== 1 && (
          <button onClick={handlePrevious}>{isLast ? "Back" : "Cancel"}</button>
        )}
        <button onClick={handleNext}>{isLast ? "Submit" : "Next"}</button>
      </div>
    </div>
  );
};

export default MultiStepForm;
