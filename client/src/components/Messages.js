import React from 'react';
import MessageList from './MessageList';
import ChannelName from './ChannelName';

const Messages = ({ match }) => {
  return (
    <div>
      <ChannelName channelId={match.params.channelId}/>
      <MessageList channelId={match.params.channelId}/>
    </div>);
}

export default Messages;
