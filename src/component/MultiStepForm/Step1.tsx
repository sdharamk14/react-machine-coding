import { ChangeEvent } from "react";
import { MultiStepFormProps } from ".";

type PersonalInformationProps = {
  name: string;
  email: string;
  onChange: (step: number, name: string, val: string) => void;
  step: number;
};

const Step1 = (props: any) => {
  const { name, email, onChange, step } = props || {};

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(step, name, value);
  };

  return (
    <div>
      <fieldset>
        <legend>Personal Information</legend>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
          />
        </div>
      </fieldset>
    </div>
  );
};

export default Step1;
