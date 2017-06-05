import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';


const ChannelName = () => {

  let channel = { name: "Stub Name"}

  return (
    <div className="channelName">
      {channel.name}
    </div>
  );
};


export default (ChannelName);
