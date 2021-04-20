import React, { useState } from 'react';
import SplitLayout from '../components/SplitLayout';
import RegisterForm from '../components/RegisterForm';
import { saveRegistrationData } from '../apis/register';

export default function RegisterPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isUserExists, setIsUserExists] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleRegisterFormSubmit(data) {
    try {
      const { message } = saveRegistrationData(data);

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
        onRegisterFormSubmit={handleRegisterFormSubmit}
      />
    </SplitLayout>
  );
}
