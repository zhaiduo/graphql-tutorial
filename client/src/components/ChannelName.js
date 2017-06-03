import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';


const MessageList = () => {

  let channel = { name: "Stub Name"}

  return (
    <div className="channelName">
      {channel.name}
    </div>
  );
};


export default (MessageList);
