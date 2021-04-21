import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SplitLayout from '../components/SplitLayout';
import LoginForm from '../components/LoginForm';
import { loginToAdminPage } from '../reducers/loginReducer';

export default function Login() {
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const history = useHistory();

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

    dispatch(loginToAdminPage(loginInput, history));
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
