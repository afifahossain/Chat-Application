import OwnMessage from './OwnMessage';
import OtherMessage from './OtherMessage';
import MessageForm from './MessageForm';

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;

  const chat = chats && chats[activeChat];

  const renderReadReceipts = (message, isOwnMessage) => chat.people.map((person, index) => person.last_read === message.id && (
    <div
      key={'read_${index}'}
      className="read-receipt"
      style={{
        float: isOwnMessage ? 'right' : 'left',
        backgroundImage: person.person.avatar && 'url(${person.person.avatar})',
      }}
    />
  ));

  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isOwnMessage = userName === message.sender.username;

      return (
        <div key={'msg_${index}'} style={{ width: '100%' }}>
          <div className="message-block">
            {isOwnMessage
              ? <OwnMessage message={message} />
              : <OtherMessage message={message} lastMessage={messages[lastMessageKey]} />}
          </div>
          <div className="read-receipts" style={{ marginRight: isOwnMessage ? '18px' : '0px', marginLeft: isOwnMessage ? '0px' : '68px' }}>
            {renderReadReceipts(message, isOwnMessage)}
          </div>
        </div>
      );
    });
  };

  if (!chat) return <div />;

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat?.title}</div>
      </div>
      {renderMessages()}
      <div style={{ height: '100px' }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;