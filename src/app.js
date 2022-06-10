import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Editor from './routes/edit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element="hi!" />
        <Route path="/edit" element={<Editor />} />
        <Route path="*" element="404" />
      </Routes>
    </Router>
  );
}

export default App;
