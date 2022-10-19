import React from 'react';
import VideoChat from './components/videochat/VideoChat';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/login/Login';

const App = () => (
  <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<VideoChat />} />
      </Routes>
    </Router>
  );

export default App;
