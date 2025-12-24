import { ChangeEvent } from "react";

type ContactInformationProps = {
  phone: string;
  city: string;
  onChange: (step: number, name: string, val: string) => void;
  step: number;
};

const Step2 = (props: any) => {
  const { phone, city, onChange, step } = props || {};

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(step, name, value);
  };

  return (
    <div>
      <fieldset>
        <legend>Contact Information</legend>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={phone}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </fieldset>
    </div>
  );
};

export default Step2;
