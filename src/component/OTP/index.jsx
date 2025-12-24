import { useEffect, useRef, useState } from "react";
import "./otp.css";

const OTP = ({ length = 4, handleOtpSubmit = () => {} }) => {
  const fieldRef = useRef([]);
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const currentFieldFocusIndexRef = useRef(0);
  console.log(
    "🚀 ~ OTP ~ currentFieldFocusIndexRef:",
    currentFieldFocusIndexRef
  );

  const handleResetFocus = () => {
    fieldRef.current[0].focus();
  };

  useEffect(() => {
    if (fieldRef.current) {
      handleResetFocus();
    }
  }, []);

  const handleChange = (index) => {
    return (e) => {
      const { value } = e.target;
      if (isNaN(value)) return false;

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp([...newOtp]);

      if (value && index !== length - 1 && e.type === "change") {
        moveFocusOnField(index + 1);
      }

      currentFieldFocusIndexRef.current = index + 1;

      if (newOtp.every((v) => v !== "")) {
        handleOtpSubmit(newOtp.toString().replaceAll(",", ""));
        setOtp(new Array(length).fill(""));
        handleResetFocus();
      }
    };
  };

  const handleKeyDown = (index) => {
    return (e) => {
      if (e.key === "Backspace" && index !== 0 && !otp[index]) {
        moveFocusOnField(index - 1);
      }
    };
  };

  const moveFocusOnField = (index) => {
    fieldRef.current[index]?.focus();
  };

  const handlePaste = (e) => {
    const value = e.clipboardData.getData("text");
    if (typeof value !== "string") return false;

    const pastedOtp = value.split("").filter((digit) => !isNaN(digit.trim()));
    let setIndex = currentFieldFocusIndexRef.current;
    const newOtp = [...otp];
    for (let digit of pastedOtp) {
      if (setIndex < length) {
        newOtp[setIndex] = digit;
        setIndex++;
      }
    }
    setOtp(newOtp);
    fieldRef.current[Math.min(setIndex, length - 1)].focus();

    // if (newOtp.every((v) => v !== "")) {
    //   handleOtpSubmit(newOtp.toString().replaceAll(",", ""));
    //   setOtp(new Array(length).fill(""));
    //   handleResetFocus();
    // }
  };

  return (
    <div className="otp-container">
      <div className="otp-fields">
        {otp.map((_, index) => {
          return (
            <input
              key={index}
              value={otp[index]}
              ref={(el) => (fieldRef.current[index] = el)}
              maxLength={1}
              onChange={handleChange(index)}
              onKeyDown={handleKeyDown(index)}
              onFocus={(e) => e.target.setSelectionRange(0, 2)}
              className="otp-input"
              onPaste={handlePaste}
            />
          );
        })}
      </div>
      <button className="otp-button" onClick={handleOtpSubmit}>
        Submit
      </button>
    </div>
  );
};

export default OTP;
