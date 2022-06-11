import React, {
  useState,
  useEffect,
} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Editor from '#routes/edit';

function App() {
  const [height, setHeight] = useState(`${window.innerHeight}px`);

  useEffect(() => {
    window.visualViewport.addEventListener(
      'resize',
      (event) => {
        setHeight(`${event.target.height}px`);
      },
    );
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element="hi!" />
        <Route path="/:room"
          element={(
            <Editor
              height={height}
              viewOnly
            />
          )}
        />
        <Route path="/:room/edit"
          element={(
            <Editor
              height={height}
            />
          )}
        />
        <Route path="*" element="404" />
      </Routes>
    </Router>
  );
}

export default App;
