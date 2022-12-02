import React from 'react';
import { FormattedMessage } from 'react-intl';
import { login } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import {
  useForm,
  SubmitHandler,
  Controller,
  useFormState,
} from 'react-hook-form';
import { loginValidation, passwordValidation } from './validation';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './auth-form.scss';

interface ISignInForm {
  login: string;
  password: string;
}

export interface Result {
  data: unknown; // прописать нормальный тип!!!!
  error: string;
}

export const AuthForm: React.FC = () => {
  const { handleSubmit, control } = useForm<ISignInForm>();
  const { errors } = useFormState({
    control,
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ISignInForm> = async data => {
    const result = await login(data);
    if (result.error) {
      console.log(result.error); //модальное окно или тост c ntrcnjv jib,rf
    } else {
      navigate('/board');
    }
  };

  return (
    <div className="auth-form">
      <Typography variant="h4" component="div">
        <FormattedMessage id='sign_in' />
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        component="div"
        className="auth-form__subtitle"
      >
        <FormattedMessage id='get_access' />
      </Typography>
      <form className="auth-form__form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="login"
          rules={loginValidation}
          render={({ field }) => (
            <TextField
              label="Login"
              onChange={e => field.onChange(e)}
              value={field.value}
              fullWidth={true}
              size="small"
              margin="normal"
              className="auth-form__input"
              error={!!errors.login?.message}
              helperText={errors?.login?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={passwordValidation}
          render={({ field }) => (
            <TextField
              label="Password"
              onChange={e => field.onChange(e)}
              value={field.value}
              fullWidth={true}
              size="small"
              margin="normal"
              type="password"
              className="auth-form__input"
              error={!!errors?.password?.message}
              helperText={errors?.password?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth={true}
          disableElevation={true}
          sx={{
            marginTop: 2,
          }}
        >
          <FormattedMessage id='sign_in' />
        </Button>
      </form>
    </div>
  );
};
