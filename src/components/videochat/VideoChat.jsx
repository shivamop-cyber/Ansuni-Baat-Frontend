import React, { useEffect } from 'react';
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideoPlayer from './VideoPlayer';
import Sidebar from './Sidebar';
import Notifications from './Notifications';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../store';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  float: {
    position: 'fixed',
    width: '70px',
    height: '40px',
    top: '40px',
    right: '40px',
    backgroundColor: '#303F9F',
    color: '#FFF',
    borderRadius: '5px',
    textAlign: 'center',
    boxShadow: '1px 1px 2px #999',
    cursor: 'pointer',
  },
  myFloat: {
    marginTop: '10px',
  },
}));

const VideoChat = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    const authtoken = localStorage.getItem('authtoken');
    const username = localStorage.getItem('username');
    if (authtoken != null) {
      dispatch(authActions.login({ authtoken, username }));
    }
  });

  const logoutHandler = () => {
    localStorage.removeItem('authtoken');
    localStorage.removeItem('username');
    dispatch(authActions.logout());
    navigate('/');
  };

  return (
    <div className={classes.wrapper}>
      <div class={classes.float} onClick={logoutHandler}>
        <p className={classes.myFloat}>Logout</p>
      </div>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography variant='h2' align='center'>
          Ansuni Baat
        </Typography>
      </AppBar>
      <VideoPlayer />
      <Sidebar>
        <Notifications />
      </Sidebar>
    </div>
  );
};

export default VideoChat;
