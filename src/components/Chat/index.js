import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import Launcher from "./Launcher";

// import { Launcher } from '../../src';
import messageHistory from "./messageHistory";
import TestArea from "./TestArea";

// import './../assets/styles';
const currentUser = JSON.parse(localStorage.getItem("user"));
const socket = io.connect("http://localhost:8000");

const Chat = () => {
  useEffect(() => {
    socket.on("message", (newMessage) => {
      setState((state) => ({
        ...state,
        messageList: [
          ...state.messageList,
          {
            author: currentUser._id === newMessage.data.userId ? "me" : "them",
            type: newMessage.data.type,
            data: newMessage.data.data,
          },
        ],
      }));

      const newMessagesCount = state.isOpen
        ? state.newMessagesCount + 1
        : state.newMessagesCount + 1;

      setState((state) => ({
        ...state,
        newMessagesCount: newMessagesCount,
      }));

    });
  }, [socket]);

  // useEffect(() => {}, [currentUser]);

  // const [currentUser, setCurrentUser] = useState({});

  const [state, setState] = useState({
    messageList: messageHistory,
    newMessagesCount: 0,
    isOpen: false,
    fileUpload: true,
  });

  //This is not active
  function onMessageWasSent(message) {
    console.log(message);
    setState((state) => ({
      ...state,
      messageList: [...state.messageList, message],
    }));
  }

  function onFilesSelected(fileList) {
    const objectURL = window.URL.createObjectURL(fileList[0]);

    setState((state) => ({
      ...state,
      messageList: [
        ...state.messageList,
        {
          type: "file",
          author: "me",
          data: {
            url: objectURL,
            fileName: fileList[0].name,
          },
        },
      ],
    }));
  }

  function sendMessage(text) {
    if (text.length > 0) {
      const newMessagesCount = state.isOpen
        ? state.newMessagesCount
        : state.newMessagesCount + 1;

      setState((state) => ({
        ...state,
        newMessagesCount: newMessagesCount,
        messageList: [
          ...state.messageList,
          {
            author: "them",
            type: "text",
            data: { text },
          },
        ],
      }));
    }
  }

  function onClick() {
    console.log(currentUser.userName);
    // useEffect(() => {
    const username = currentUser.userName;
    const roomname = "jakarta";
    if (!state.isOpen && roomname !== currentUser._id) {
      !state.isOpen && socket.emit("joinRoom", { username, roomname });
    }

    // console.log(socket);
    // }, []);

    setState((state) => ({
      ...state,
      isOpen: !state.isOpen,
      newMessagesCount: 0,
    }));
  }

  return (
    <div>
      <TestArea onMessage={sendMessage} />

      <Launcher
        socket={socket}
        agentProfile={{
          teamName: "Company1",
          imageUrl:
            "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
        }}
        onMessageWasSent={onMessageWasSent}
        onFilesSelected={onFilesSelected}
        messageList={state.messageList}
        newMessagesCount={state.newMessagesCount}
        onClick={onClick}
        isOpen={state.isOpen}
        showEmoji
        fileUpload={state.fileUpload}
        // pinMessage={{
        //   id: 123,
        //   imageUrl:
        //     'https://scontent.fcgk19-1.fna.fbcdn.net/v/t31.18172-8/18449719_288905068226376_1080667994610698649_o.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFMjYAfvNhdNncbWEs82aiUCY5gXC25-eMJjmBcLbn548yzmIHVGCCqSddZ4H9bT8QdJHM98a1mlS7rBHTSU3SG&_nc_ohc=odagtZ_d0ZoAX-9Hf24&_nc_ht=scontent.fcgk19-1.fna&oh=a359c307316a03898b01c19de4e8c556&oe=60F4AF35',
        //   title:
        //     'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        //   text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        // }}
        // onPinMessage={(value) => console.log('Testing', value)}
        placeholder="placeholder"
      />
    </div>
  );
};

export default Chat;
