import React from 'react';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MessageList from './MessageList';
import UserInput from './UserInput';
import Header from './Header';
import PinMessage from './PinMessage';

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

  return (
    <div
      className={classNames(
        'sc-chat-window',
        { opened: isOpen },
        { closed: !isOpen }
      )}
    >
      <Header teamName={teamName} imageUrl={imageUrl} onClose={onClose} />

      {pinMessage && (
        <PinMessage pinMessage={pinMessage} onPinMessage={onPinMessage} />
      )}

      <MessageList messages={messageList} imageUrl={imageUrl} />

      <UserInput
        socket={props.socket}
        onSubmit={onUserInputSubmit}
        onFilesSelected={onFilesSelected}
        showEmoji={showEmoji}
        fileUpload={fileUpload}
        placeholder={placeholder}
      />

      <div
        className={classNames(
          'sc-chat-window-list',
          { opened: isOpen },
          { closed: !isOpen }
        )}
      >
        <Container>
          <Row className={'sc-header-list'}>
            <h3>Chat List</h3>
          </Row>
          <Row className={'sc-chat-list active'}>
            <div>
              <img
                alt='chat-list'
                src='https://scontent.fcgk19-1.fna.fbcdn.net/v/t31.18172-8/18449719_288905068226376_1080667994610698649_o.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFMjYAfvNhdNncbWEs82aiUCY5gXC25-eMJjmBcLbn548yzmIHVGCCqSddZ4H9bT8QdJHM98a1mlS7rBHTSU3SG&_nc_ohc=odagtZ_d0ZoAX-9Hf24&_nc_ht=scontent.fcgk19-1.fna&oh=a359c307316a03898b01c19de4e8c556&oe=60F4AF35'
              />
              <span>Company1</span>
            </div>
          </Row>
          <Row className={'sc-chat-list'}>
            <div>
              <img
                alt='chat-list'
                src='https://scontent.fcgk19-1.fna.fbcdn.net/v/t31.18172-8/18449719_288905068226376_1080667994610698649_o.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFMjYAfvNhdNncbWEs82aiUCY5gXC25-eMJjmBcLbn548yzmIHVGCCqSddZ4H9bT8QdJHM98a1mlS7rBHTSU3SG&_nc_ohc=odagtZ_d0ZoAX-9Hf24&_nc_ht=scontent.fcgk19-1.fna&oh=a359c307316a03898b01c19de4e8c556&oe=60F4AF35'
              />
              <span>Company2</span>
            </div>
          </Row>
          <Row className={'sc-chat-list'}>
            <div>
              <img
                alt='chat-list'
                src='https://scontent.fcgk19-1.fna.fbcdn.net/v/t31.18172-8/18449719_288905068226376_1080667994610698649_o.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFMjYAfvNhdNncbWEs82aiUCY5gXC25-eMJjmBcLbn548yzmIHVGCCqSddZ4H9bT8QdJHM98a1mlS7rBHTSU3SG&_nc_ohc=odagtZ_d0ZoAX-9Hf24&_nc_ht=scontent.fcgk19-1.fna&oh=a359c307316a03898b01c19de4e8c556&oe=60F4AF35'
              />
              <span>Company3</span>
            </div>
          </Row>
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
