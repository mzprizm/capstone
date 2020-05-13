import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
          <!doctype html>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

    </div>
    <body>
        <canvas class="whiteboard" ></canvas>
        <div>pick your color and draw a picture</div>
        <div>draw / whiteboard app utilizing socket.io.</div>
        <div>created by Carolyn</div>
        <div class="colors">
            <div class="color black"></div>
            <div class="color red"></div>
            <div class="color green"></div>
            <div class="color blue"></div>
            <div class="color yellow"></div>
        </div>
        <script src="/socket.io/socket.io.js"></script>
        <script src="/main.js"></script>
    </body>
  );
}

export default App;
