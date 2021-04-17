import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import { saveRegistrationData } from '../apis/register';

export default function RegisterPage() {
  const [userInputs, setUserInputs] = useState({
    email: '',
    name: '',
    password: '',
    companyEmail: '',
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [isUserExists, setIsUserExists] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleRegisterInputsChange(e) {
    const { name, value, } = e.target;

    setUserInputs({
      ...userInputs,
      [name]: value,
    });
  }

  async function handleRegisterFormSubmit(e) {
    e.preventDefault();

    try {
      const response = saveRegistrationData(userInputs);
      const message = response.message;

      if (message === 'register success') {
        setIsRegistered(true);
      } else if (message === 'user exists') {
        setIsUserExists(true);
      }
    } catch (e) {
      setIsError(true);
    }
  }

  return (
    <RegisterForm
      isUserExists={isUserExists}
      isRegistered={isRegistered}
      isError={isError}
      onRegisterInputChange={handleRegisterInputsChange}
      onRegisterFormSubmit={handleRegisterFormSubmit}
    />
  );
}
