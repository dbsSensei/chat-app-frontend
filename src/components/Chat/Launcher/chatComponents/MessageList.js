import { prop } from "ramda";
import React, { useRef, useEffect } from "react";
import Message from "./Messages";

function MessageList(props) {
  const element = useRef(null);
  const elementCurrent = prop("current", element);

  useEffect(() => {
    if (elementCurrent) {
      elementCurrent.scrollTop = elementCurrent.scrollHeight;
    }
  }, [props]);

  return props.buttonActive ? (
    <div className="sc-message-list" ref={element}>
      {props.messages.map((message, i) => (
        <Message message={message} key={i} />
      ))}
    </div>
  ) : (
    <div>
      <h1 style={{ marginTop: "200px" }}>Happy Chatting</h1>
    </div>
  );
}

export default MessageList;
