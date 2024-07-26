import React, { useState } from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import PasswordForm from "./PasswordForm";
import Register from "./form";
import UsernameForm from "./UsernameForm";
import LoadingIndicator from "../loading";
import FullName from "./Fullname";
import Birthdayform from "./Birthdayform";
import LoginForm from "./forms/LoginForm";

const Login = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleNext = () => {
    setLoading(true);
    {
      /**/
    }
    setTimeout(() => {
      setLoading(false);
      setStep(step + 1);
    }, 400);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {loading && <LoadingIndicator />}
      {!loading && step === 0 && <Register onNext={handleNext} />}
      {!loading && step === 1 && <FullName onNext={handleNext} />}
      {!loading && step === 2 && <Birthdayform onNext={handleNext} />}
      {!loading && step === 3 && <UsernameForm onNext={handleNext} />}
      {!loading && step === 4 && <PasswordForm />}
    </div>
  );
};
export default Login;
