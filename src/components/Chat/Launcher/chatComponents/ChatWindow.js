import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import classNames from "classnames";
import MessageList from "./MessageList";
import UserInput from "./UserInput";
import Header from "./Header";
import PinMessage from "./PinMessage";

const urlAPI = "http://localhost:3001";

function ChatWindow(props) {
  const {
    isOpen,
    onClose,
    agentProfile,
    showEmoji,
    fileUpload,
    messageList,
    onUserInputSubmit,
    onFilesSelected,
    pinMessage,
    onPinMessage,
    placeholder,
  } = props;

  const { teamName, imageUrl } = agentProfile;

  const [rooms, setRooms] = useState([]);

  const [currentRoom, setCurrentRoom] = useState({});
  const [createRoomInput, setCreateRoomInput] = useState("");
  const [buttonActive, setButtonActive] = useState("");
  // const currentChat = rooms.filter((room) => room._id === buttonActive);

  useEffect(() => {
    axios({
      method: "get",
      url: `${urlAPI}/api/v1/rooms`,
      responseType: "json",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      // .then((res) => res.json())
      .then((roomsData) => {
        // console.log(rooms)
        setRooms([...rooms, ...roomsData.data.data.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  const addListHandler = (e) => {
    e.preventDefault();
    console.log(e);
    // await axios({
    //   method: "post",
    //   url: `${urlAPI}/api/v1/rooms/createRoom`,
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("token"),
    //   },
    //   data: {
    //     chatRoomId: "jakarta",
    //     userId: user._id,
    //     username: user.userName,
    //     type: "emoji",
    //     data: { emoji },
    //   },
    // });
  };

  return (
    <div
      className={classNames(
        "sc-chat-window",
        { opened: isOpen },
        { closed: !isOpen }
      )}
    >
      <Header
        buttonActive={buttonActive}
        currentRoom={currentRoom}
        teamName={teamName}
        imageUrl={imageUrl}
        onClose={onClose}
      />

      {pinMessage && (
        <PinMessage pinMessage={pinMessage} onPinMessage={onPinMessage} />
      )}

      <MessageList
        buttonActive={buttonActive}
        messages={messageList}
        imageUrl={imageUrl}
      />

      <UserInput
        buttonActive={buttonActive}
        socket={props.socket}
        onSubmit={onUserInputSubmit}
        onFilesSelected={onFilesSelected}
        showEmoji={showEmoji}
        fileUpload={fileUpload}
        placeholder={placeholder}
      />

      <div
        className={classNames(
          "sc-chat-window-list",
          { opened: isOpen },
          { closed: !isOpen }
        )}
      >
        <Container>
          <Row className={"sc-header-list"}>
            <h3>Chat List</h3>
          </Row>
          <Row>
            <form onSubmit={(e) => addListHandler(e)}>
              <input
                className={"sc-header-list-add-input"}
                value={createRoomInput}
                onChange={(e) => setCreateRoomInput(e.target.value)}
              />
              <button className={"sc-header-list-add-button"}>
                <i style={{ color: "#605bfb" }} className="fa fa-search" />
              </button>
            </form>
          </Row>
          {rooms.map((room) => {
            console.log(room);
            return (
              <Row
                onClick={(e) => {
                  console.log(e.target.id);
                  props.onRoomChange(room._id);
                  setButtonActive(room._id);
                  setCurrentRoom(room);
                }}
                id={room._id}
                className={`sc-chat-list ${
                  buttonActive === room._id ? "active" : ""
                }`}
              >
                <div id={room._id}>
                  <img id={room._id} alt="chat-list" src={room.img} />
                  <span id={room._id}>{room.name}</span>
                </div>
              </Row>
            );
          })}
        </Container>
      </div>
    </div>
  );
}

ChatWindow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  agentProfile: PropTypes.object.isRequired,
  showEmoji: PropTypes.bool,
  fileUpload: PropTypes.bool,
  messageList: PropTypes.array,
  onUserInputSubmit: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func,
  pinMessage: PropTypes.object,
  onPinMessage: PropTypes.func,
  placeholder: PropTypes.string,
};

export default ChatWindow;
