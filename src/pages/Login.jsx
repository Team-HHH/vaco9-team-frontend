import React from 'react';

import SplitLayout from '../components/SplitLayout';
import LoginForm from '../components/LoginForm';

export default function Login() {
  function handleLoginSubmit(event) {
    event.preventDefault();
  }

  return (
    <SplitLayout>
      <LoginForm handleLoginSubmit={handleLoginSubmit} />
    </SplitLayout>
  );
}
