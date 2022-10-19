import React from 'react';
import VideoChat from './components/videochat/VideoChat';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login.js';
import { ContextProvider } from './Context';

const App = () => (
  <Router>
    <Routes>
      <Route
        path='/chat'
        exact
        element={
          <ContextProvider>
            <VideoChat />
          </ContextProvider>
        }
      />
      <Route path='/' exact element={<Login />} />
    </Routes>
  </Router>
);

export default App;
