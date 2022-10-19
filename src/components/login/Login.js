import React, { useRef, useEffect, useState } from 'react';
import classes from './Login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/index';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const userNameInputRef = useRef();

  const [isLoginForm, setIsLoginForm] = useState(true);

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [open, setOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const navigate = useNavigate();
  const baseURL = 'https://secure-coast-11315.herokuapp.com/api';
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    console.log('here in submit');

    const data = {
      username: userNameInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    if (!isLoginForm) {
      data.role = ['user'];
      data.email = emailInputRef.current.value;
    }

    if (
      data.username === '' ||
      data.password === '' ||
      (!isLoginForm && data.email === '')
    ) {
      return;
    }

    setIsAuthenticating(true);

    console.log(data);

    if (isLoginForm) {
      axios
        .post(`${baseURL}/auth/signin`, data)
        .then((response) => {
          console.log(response);
          localStorage.setItem('authtoken', response.data.accessToken);
          localStorage.setItem('username', response.data.username);
          dispatch(
            authActions.login({
              authtoken: response.data.accessToken,
              username: response.data.username,
            })
          );
          navigate('/chat');
          setIsAuthenticating(false);
        })
        .catch(function (error) {
          setIsAuthenticating(false);
          setOpen(true);
          console.log(error);
        });
    } else {
      axios
        .post(`${baseURL}/auth/signup`, data)
        .then((response) => {
          setIsAuthenticating(false);
        })
        .catch(function (error) {
          setIsAuthenticating(false);
          setOpen(true);
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/chat', { replace: true });
      return;
    }
    const authtoken = localStorage.getItem('authtoken');
    const username = localStorage.getItem('username');
    if (authtoken != null) {
      dispatch(authActions.login({ authtoken, username }));
    }
  });

  return (
    <div className={classes.background}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
          severity='error'
        >
          Authentication Falied
        </Alert>
      </Collapse>
      <div className={classes.outer}>
        <div className={classes.container}>
          {isAuthenticating ? (
            <Box className={classes.spinner} sx={{ display: 'flex' }}>
              <CircularProgress color='secondary' />
            </Box>
          ) : (
            <form className={classes.form} onSubmit={submitHandler}>
              <input
                ref={userNameInputRef}
                className={classes.forminput}
                placeholder='{ Username }'
              />
              <input
                ref={passwordInputRef}
                className={classes.forminput}
                placeholder='{ Password }'
              />
              {!isLoginForm && (
                <input
                  ref={emailInputRef}
                  className={classes.forminput}
                  placeholder='{ Email }'
                />
              )}
              <button
                type='submit'
                className={isEnabled ? classes.formbtn : classes.formdisablebtn}
                disabled={!isEnabled}
                style={{ marginBottom: '20px' }}
              >
                {isLoginForm ? 'Login' : 'Sign Up'}
              </button>
              <div
                className={classes.changeOption}
                onClick={() => {
                  setIsLoginForm((prev) => {
                    return !prev;
                  });
                }}
              >
                <u>{isLoginForm ? 'Sign Up?' : 'Login?'}</u>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
