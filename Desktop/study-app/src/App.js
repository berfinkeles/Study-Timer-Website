import { useState } from 'react';
import './App.css';
import DisplayComponent from './Components/DisplayComponent';
import BtnComponent from './Components/BtnComponent';
import SpotifyPlayer from 'react-spotify-player';


function App() {
  const [time, setTime] = useState({ms:0, s:0, m:0, h:0});
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  // 0 = not started, 1 = started, 2 = paused

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const run = () => {
      if(updatedM === 60){
        updatedH++;
        updatedM = 0;
      }
      if(updatedS === 60){
        updatedM++;
        updatedS = 0;
      }
      if(updatedMs === 100){
        updatedS++;
        updatedMs = 0;
      }
      updatedMs++;
      return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ms:0, s:0, m:0, h:0});
  };

  const resume = () => start();

  return (
    <div className="main-section">
      <div className="clock-holder">
          <div className="stopwatch">
                <DisplayComponent time={time}/>
                <BtnComponent status={status} resume={resume} reset={reset} stop={stop} start={start}/>
          </div>
      </div>
      <div className="centered">
              <iframe src="https://open.spotify.com/embed/playlist/2pr6zOun8CUo8h2cqsJhJf?utm_source=generator" width="80%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>          
      </div>
    </div>
    
  );
}

export default App;
