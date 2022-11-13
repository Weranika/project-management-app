import React from 'react';
import { AuthForm } from '../../Forms/SignInForm';
import '../../Forms/auth-form.scss';

export const AuthPage: React.FC = () => {
  return (
    <div className="signin-page">
      <AuthForm />
    </div>
  );
};
