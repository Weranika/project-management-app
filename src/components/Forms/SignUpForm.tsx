import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { useAppDispatch } from '../../hook';
import {
  setIsAuth,
  setMessage,
  setHasError,
  setIsLoading,
} from '../../reducers/authSlice';
import { AuthState } from '../../types';

import './auth-form.scss';
import Spinner from '../Spinner/Spinner';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ISignUpForm {
  login: string;
  password: string;
  name: string;
}

export interface Result {
  data: unknown;
  error: string;
}

export const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<ISignUpForm>();
  const { errors } = useFormState({
    control,
  });

  const navigate = useNavigate();

  const { isAuth, isLoading, hasError, message } = useSelector(
    (state: { auth: AuthState }) => state.auth,
  );

  const onSubmit: SubmitHandler<ISignUpForm> = async data => {
    try {
      dispatch(setIsLoading(true));
      const result = await register(data);
      if (result.error) {
        dispatch(setMessage(result.error));
        dispatch(setHasError(true));
      } else {
        dispatch(setMessage('You have been successfully signed up.'));
        dispatch(setHasError(false));
        navigate('/signIn');
      }

      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
      dispatch(setIsAuth(false));
      dispatch(setHasError(true));
      dispatch(setMessage('Something goes wrong. Please try later.'));
    }
  };

  return (
    <div className="auth-form">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Typography variant="h4" component="div">
            <FormattedMessage id="sign_up" />
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            className="auth-form__subtitle"
          >
            <FormattedMessage id="get_access" />
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
              <FormattedMessage id="sign_up" />
            </Button>
          </form>
          <Snackbar
            open={message ? true : false}
            autoHideDuration={5000}
            onClose={() => dispatch(setMessage(''))}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            key={'bottomright'}
          >
            <Alert
              onClose={() => dispatch(setMessage(''))}
              severity={hasError ? 'error' : 'success'}
              sx={{ width: '100%', fontSize: '1rem' }}
            >
              {message}
            </Alert>
          </Snackbar>
        </>
      )}
    </div>
  );
};
