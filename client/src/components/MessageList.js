import React from 'react';
import PropTypes from 'prop-types';

const MessageList = ({ messages }) => {
  return (
    <ul className="message-list scrollable scrollbar-amber">
      {messages.map((message, idx) => {
        return (
          <li key={idx} className="message">
            <div>{message.senderId}</div>
            <div>{message.text}</div>
          </li>
        );
      })}
    </ul>
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object)
};

export default MessageList;
