import React, {
  useState,
  useEffect,
  Suspense,
} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

const Editor = React.lazy(() => import('#routes/edit'));

function App() {
  const [height, setHeight] = useState(window.innerHeight - 10);

  useEffect(() => {
    window.visualViewport.addEventListener(
      'resize',
      (event) => {
        setHeight(event.target.height - 10);
      },
    );
  }, []);

  useEffect(() => {
    async function screenAutoLockOff() {
      try {
        await navigator.wakeLock.request('screen');
      } catch (error) {
        console.error(error);
      }
    }

    screenAutoLockOff();
  });

  return (
    <Router>
      <Suspense fallback={<div />}>
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
      </Suspense>
    </Router>
  );
}

export default App;
