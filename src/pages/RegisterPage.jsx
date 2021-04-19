import React, { useState } from 'react';
import SplitLayout from '../components/SplitLayout';
import RegisterForm from '../components/RegisterForm';
import { saveRegistrationData } from '../apis/register';

export default function RegisterPage() {
  const [userInputs, setUserInputs] = useState({
    email: '',
    name: '',
    password: '',
    companyName: '',
    companyEmail: '',
    companyRegistrationNumber: '',
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [isUserExists, setIsUserExists] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleRegisterInputsChange(event) {
    const { name, value, } = event.target;
    setUserInputs({
      ...userInputs,
      [name]: value,
    });
  }

  function handleRegisterFormSubmit(event) {
    event.preventDefault();

    try {
      const response = saveRegistrationData(userInputs);
      const message = response.message;

      if (message === 'register success') {
        setIsRegistered(true);
      } else if (message === 'user exists') {
        setIsUserExists(true);
      }
    } catch (error) {
      setIsError(true);
    }
  }

  return (
    <SplitLayout>
      <RegisterForm
        isUserExists={isUserExists}
        isRegistered={isRegistered}
        isError={isError}
        onRegisterInputChange={handleRegisterInputsChange}
        onRegisterFormSubmit={handleRegisterFormSubmit}
      />
    </SplitLayout>
  );
}
