/* eslint-disable react/jsx-props-no-spreading */
import React, {
  createRef,
  useState,
  useEffect,
} from 'react';
import { useSwipeable } from 'react-swipeable';
import { firebase } from '#services';

function Editor(props) {
  const {
    height,
    viewOnly,
  } = props;

  const [text, setText] = useState('');
  // const [history, setHistory] = useState('');

  const roomId = 'test';

  useEffect(
    () => {
      const off = firebase.connectToRoom(roomId, (room) => setText(room?.text));
      return off;
    },
    [],
  );

  const handleTextChange = (newText) => firebase.editRoomText(roomId, newText);
  const textAreaRef = createRef();

  const efn = (e) => e;

  const handlerFunctions = {
    onSwipedLeft: !viewOnly ? () => handleTextChange('') : efn,
    onSwipedDown: !viewOnly ? () => textAreaRef.current?.blur?.() : efn,
  };

  const handlers = useSwipeable(handlerFunctions);

  return (
    <div {...handlers}>
      <textarea
        style={{ height }}
        value={text}
        onChange={(event) => handleTextChange(event.target.value)}
        ref={textAreaRef}
        readOnly={viewOnly}
      />
    </div>
  );
}

export default Editor;
