import { ChangeEvent } from "react";

type FinancialInformationProps = {
  salary: string;
  bank: string;
  onChange: (step: number, name: string, val: string) => void;
  step: number;
};

const Step3 = (props: any) => {
  const { salary, bank, onChange, step } = props || {};

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(step, name, value);
  };

  return (
    <div>
      <fieldset>
        <legend>Financial Information</legend>
        <div>
          <label htmlFor="salary">Salary</label>
          <input
            type="text"
            name="salary"
            id="salary"
            onChange={(e) => handleChange(e)}
            value={salary}
          />
        </div>
        <div>
          <label htmlFor="bank">Bank</label>
          <input
            type="text"
            name="bank"
            id="bank"
            onChange={(e) => handleChange(e)}
            value={bank}
          />
        </div>
      </fieldset>
    </div>
  );
};

export default Step3;
