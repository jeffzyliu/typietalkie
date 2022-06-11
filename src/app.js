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
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.visualViewport.addEventListener(
      'resize',
      (event) => {
        setHeight(event.target.height);
      },
    );
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element="hi!" />
        <Route path="/:roomId"
          element={(
            <Editor
              height={height}
              viewOnly
            />
          )}
        />
        <Route path="/:roomId/edit"
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
