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
    currentRoom:"",
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

  function onRoomChange(room) {
    setState({...state,currentRoom:"jakarta"})
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
      {/* <TestArea onMessage={sendMessage} /> */}

      {currentUser && <Launcher
        socket={socket}
        agentProfile={{
          teamName: "Company1",
          imageUrl:
            "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
        }}
        onMessageWasSent={onMessageWasSent}
        onFilesSelected={onFilesSelected}
        messageList={state.messageList}
        onRoomChange={onRoomChange}
        newMessagesCount={state.newMessagesCount}
        onClick={onClick}
        isOpen={state.isOpen}
        showEmoji
        fileUpload={state.fileUpload}
        // pinMessage={{
        //   id: 123,
        //   imageUrl:
        //     'https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/6efea583856b540b27a74dfb66dc62cb.jpg',
        //   title:
        //     'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        //   text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        // }}
        // onPinMessage={(value) => console.log('Testing', value)}
        placeholder="placeholder"
      />}
    </div>
  );
};

export default Chat;
