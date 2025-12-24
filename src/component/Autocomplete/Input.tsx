type InputProps = {
  value: string;
  setValue: (val: string) => void;
  clear: () => void;
};

const Input = ({ value, setValue, clear }: InputProps) => {
  return (
    <div style={{ width: "100%" }}>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={clear}>X</button>
    </div>
  );
};

export default Input;
