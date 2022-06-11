/* eslint-disable react/jsx-props-no-spreading */
import React, {
  createRef,
  useState,
  useEffect,
} from 'react';
import { useSwipeable } from 'react-swipeable';
import { firebase } from '#services';
import { useParams } from 'react-router-dom';

function Editor(props) {
  const {
    height,
    viewOnly,
  } = props;

  const { roomId } = useParams();

  const [text, setText] = useState('');
  const [history, setHistory] = useState({});
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(
    () => {
      const off = firebase.connectToRoomText(roomId, setText);
      return off;
    },
    [],
  );

  useEffect(
    () => {
      const off = firebase.connectToRoomHistory(roomId, setHistory);
      return off;
    },
    [],
  );

  const handleTextChange = (newText) => firebase.editRoomText(roomId, newText);
  const handleClear = (oldText) => oldText && firebase.clearText(roomId, oldText);

  const textAreaRef = createRef();

  const efn = (e) => e;

  const handlerFunctions = {
    onSwipedLeft: !viewOnly ? () => handleClear(text) : efn,
    onSwipedDown: !viewOnly ? () => {
      textAreaRef.current?.blur?.();
      setDisplayModal(false);
    } : efn,
    onSwipedUp: () => setDisplayModal(true),
    onSwipedRight: () => setDisplayModal(true),
  };

  const handlers = useSwipeable(handlerFunctions);

  console.log(history);

  return (
    <>
      <div {...handlers}>
        <textarea
          style={{ height }}
          value={text}
          onChange={(event) => handleTextChange(event.target.value)}
          ref={textAreaRef}
          readOnly={viewOnly}
        />
      </div>
      <div
        className={`Modal ${displayModal ? 'Show' : ''}`}
        style={{ 'max-height': height - 100 }}
      >
        {Object.entries(history)
          .reverse()
          .map(([k, v]) => (
            <div
              key={k}
              className="historyItem"
              onClick={efn}
            >
              {v}
            </div>
          ))}
      </div>
    </>
  );
}

export default Editor;
