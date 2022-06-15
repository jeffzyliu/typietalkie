/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import { useSwipeable } from 'react-swipeable';
import useFitText from 'use-fit-text';
import { useParams } from 'react-router-dom';

import { firebase } from '#services';

function Editor(props) {
  const {
    height,
    viewOnly,
  } = props;

  const { roomId } = useParams();

  const [text, setText] = useState('');
  const [history, setHistory] = useState({});
  const [displayModal, setDisplayModal] = useState(false);
  const [wantsFocus, setWantsFocus] = useState(false);

  const { fontSize, ref: textAreaRef } = useFitText({
    maxFontSize: 280,
    minFontSize: 20,
    resolution: 10,
  });


  useEffect(() => {
    const off = firebase.connectToRoomText(roomId, setText);
    return off;
  }, [roomId]);

  useEffect(() => {
    const off = firebase.connectToRoomHistory(roomId, setHistory);
    return off;
  }, [roomId]);

  // track reference of prior history
  const historyRef = useRef({});

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  const prevHistory = historyRef.current;

  // manage focus and blur of text
  useEffect(() => {
    if (displayModal || !wantsFocus) {
      textAreaRef.current?.blur?.();
    } else if (wantsFocus) {
      // jump to end if history changed
      if (prevHistory !== history) {
        const length = textAreaRef.current?.value?.length ?? 0;
        textAreaRef.current?.setSelectionRange?.(length, length);
      }
      textAreaRef.current?.focus?.();
    }
  }, [displayModal, wantsFocus, textAreaRef, prevHistory, history]);

  const handleTextChange = (newText) => firebase.editRoomText(roomId, newText);

  const handleClear = () => {
    if (viewOnly) return;
    firebase.pushToHistory(roomId, text);
    firebase.editRoomText(roomId, '');
  };

  const handleHistoryText = (historyText) => {
    if (viewOnly) return;
    firebase.pushToHistory(roomId, text);
    firebase.editRoomText(roomId, historyText);
    setDisplayModal(false);
  };

  const closeHistoryOrUnfocus = () => {
    // this triggers before useEffect and handles the case of history already closed
    if (!displayModal) textAreaRef.current?.blur?.();
    setDisplayModal(false);
  };

  const openHistory = () => {
    setDisplayModal(true);
  };

  const handlerFunctions = {
    onSwipedLeft: handleClear,
    onSwipedDown: closeHistoryOrUnfocus,
    onSwipedUp: openHistory,
    onSwipedRight: openHistory,
  };

  const handlers = useSwipeable(handlerFunctions);

  // work against keyboard moving window up
  window.scrollTo(0, 0);

  return (
    <>
      <div {...handlers}>
        <textarea
          style={{ height, fontSize }}
          value={text}
          onChange={(event) => handleTextChange(event.target.value)}
          ref={textAreaRef}
          readOnly={viewOnly}
          disabled={displayModal}
          onFocus={() => setWantsFocus(true)}
          onBlur={() => !displayModal && setWantsFocus(false)}
        />
      </div>
      <div
        className={`Modal ${displayModal ? 'Show' : ''}`}
        style={{ height: height - 100 }}
      >
        {Object.entries(history)
          .reverse()
          .map(([key, historyText]) => (
            <div
              key={key}
              className="historyItem"
              onClick={() => handleHistoryText(historyText)}
            >
              {historyText}
            </div>
          ))}
      </div>
    </>
  );
}

export default Editor;
