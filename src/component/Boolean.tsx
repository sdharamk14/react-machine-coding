import { useBoolean } from "../hooks/useBoolean";

const BooleanText = () => {
  const { value, toggle } = useBoolean(true);

  return (
    <>
      <button>{!value}</button>
      <div>Value: {value}</div>
    </>
  );
};

export default BooleanText;
