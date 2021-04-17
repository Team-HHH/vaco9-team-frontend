import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  const [userInputs, setUserInputs] = useState({
    email: '',
    name: '',
    password: '',
    companyEmail: '',
  });

  function handleRegisterInputsChange(e) {
    const { name, value, } = e.target;

    setUserInputs({
      ...userInputs,
      [name]: value,
    });
  }

  async function handleRegisterFormSubmit() {
  }

  return (
    <RegisterForm
      onRegisterInputChange={handleRegisterInputsChange}
      onRegisterFormSubmit={handleRegisterFormSubmit}
    />
  );
}
