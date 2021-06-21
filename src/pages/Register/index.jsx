import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SplitLayout from '../../components/SplitLayout';
import RegisterForm from '../../components/RegisterForm';
import { errorOccurred } from '../../reducers/error';
import { saveRegistrationData } from '../../apis/register';
import { registerMessage } from '../../constants/message';

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();

  async function handleRegisterFormSubmit(data) {
    try {
      const response = await saveRegistrationData(data);
      const { message } = await response.json();

      if (!response.ok) {
        dispatch(errorOccurred(message));
        return;
      }

      history.push('/login');
    } catch (error) {
      dispatch(errorOccurred(registerMessage.SIGN_UP_FAILED));
    }
  }

  return (
    <SplitLayout>
      <RegisterForm
        onRegisterFormSubmit={handleRegisterFormSubmit}
      />
    </SplitLayout>
  );
}
