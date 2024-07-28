import React, { useState } from "react";
import PasswordForm from "./PasswordForm";
import Register from "./form";
import UsernameForm from "./UsernameForm";
import LoadingIndicator from "../loading";
import FullName from "./Fullname";
import Birthdayform from "./Birthdayform";
import Email from "./Email";
import { useAuth } from "../../context/AuthContext";

const Login = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    username: "",
    email: "",
    password: "",
  });

  const handleNext = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep((prevStep) => prevStep + 1);
    }, 400);
  };

  const handleSubmit = async (data) => {
    const finalData = { ...formData, ...data };
    setFormData(finalData);
    setLoading(true);
    const response = await register(finalData);
    setLoading(false);
    if (response.success) {
      onClose(); // Close the form on successful registration
    } else {
      alert(response.message || "Registration failed");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {loading && <LoadingIndicator />}
      {!loading && step === 0 && (
        <Register onClose={onClose} onNext={handleNext} />
      )}
      {!loading && step === 1 && <FullName onNext={handleNext} />}
      {!loading && step === 2 && <Birthdayform onNext={handleNext} />}
      {!loading && step === 3 && <UsernameForm onNext={handleNext} />}
      {!loading && step === 4 && <Email onNext={handleNext} />}
      {!loading && step === 5 && <PasswordForm onNext={handleSubmit} />}
      <button className="absolute top-4 right-4 text-white" onClick={onClose}>
        ✕
      </button>
    </div>
  );
};

export default Login;
