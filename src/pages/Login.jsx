import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import SplitLayout from '../components/SplitLayout';
import LoginForm from '../components/LoginForm';
import { loginToAdminPage } from '../reducers/loginReducer';

export default function Login() {
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  function handleLoginInputChange(event) {
    const {
      name,
      value,
    } = event.target;

    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  }

  function handleLoginSubmit(event) {
    event.preventDefault();

    dispatch(loginToAdminPage(loginInput));
  }

  return (
    <SplitLayout>
      <LoginForm
        handleLoginInputChange={handleLoginInputChange}
        handleLoginSubmit={handleLoginSubmit}
        loginInput={loginInput}
      />
    </SplitLayout>
  );
}
