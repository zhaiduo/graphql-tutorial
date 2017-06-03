import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';

import AddMessage from './AddMessage';
import NotFound from './NotFound';

const MessageList = ({ data: {loading, error, channel } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if(channel === null){
    return <NotFound />
  }

  return (
    <div className="messagesList">
      { channel.messages.map( message =>
        (<div key={message.id} className={'message ' + (message.id < 0 ? 'optimistic' : '')}>
            {message.text}
        </div>)
      )}
      <AddMessage />
    </div>
  );
};

export const messageQuery = gql`
  query ChannelMessageQuery($channelId : ID!) {
    channel(id: $channelId) {
      id
      messages {
        id
        text
      }
    }
  }
`;

export default (graphql(messageQuery, {
  options: (props) => ({
    pollInterval: 5000,
    variables: { channelId: props.channelId },
  }),
})(MessageList));
