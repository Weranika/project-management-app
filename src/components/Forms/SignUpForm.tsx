import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  useForm,
  SubmitHandler,
  Controller,
  useFormState,
} from 'react-hook-form';
import {
  loginValidation,
  nameValidation,
  passwordValidation,
} from './validation';
import { register } from '../../services/auth.service';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './auth-form.scss';
interface ISignUpForm {
  login: string;
  password: string;
  name: string;
}

export const SignUpForm: React.FC = () => {
  const { handleSubmit, control } = useForm<ISignUpForm>();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<ISignUpForm> = data => {
    register(data);
  };

  console.log(errors, 'error');

  return (
    <div className="auth-form">
      <Typography variant="h4" component="div">
        <FormattedMessage id='sign_up' />
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
        <Controller
          control={control}
          name="name"
          rules={nameValidation}
          render={({ field }) => (
            <TextField
              label="Name"
              onChange={e => field.onChange(e)}
              value={field.value}
              fullWidth={true}
              size="small"
              margin="normal"
              type="name"
              className="auth-form__input"
              error={!!errors?.name?.message}
              helperText={errors?.name?.message}
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
          <FormattedMessage id='sign_up' />
        </Button>
      </form>
    </div>
  );
};
