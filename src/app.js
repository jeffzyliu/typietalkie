/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useEffect,
  useState,
  createRef,
} from 'react';
import { useSwipeable } from 'react-swipeable';

function App() {
  const textAreaRef = createRef();

  const [height, setHeight] = useState(`${window.innerHeight}px`);
  const [text, setText] = useState('');

  useEffect(() => {
    window.visualViewport.addEventListener(
      'resize',
      (event) => {
        setHeight(`${event.target.height}px`);
      },
    );
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => setText(''),
    onSwipedDown: () => textAreaRef.current?.blur?.(),
  });

  return (
    <div {...handlers}>
      <textarea
        style={{ height }}
        value={text}
        onChange={(event) => setText(event.target.value)}
        ref={textAreaRef}
      />
    </div>
  );
}

export default App;
