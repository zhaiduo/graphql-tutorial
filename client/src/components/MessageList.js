import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';

import AddMessage from './AddMessage';

const MessageList = ({ data: {loading, error, messages } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="messagesList">
      { messages.map( message =>
        (<div key={message.id} className={'message ' + (message.id < 0 ? 'optimistic' : '')}>
            {message.message}
        </div>)
      )}
      <AddMessage />
    </div>
  );
};

//Needs to have a parameter for channel id
//Fragement for each message? -> usernames and messages
export const messageQuery = gql`
  query MessageQuery($channelId : ID!) {
    messages(channelId: $channelId) {
      id
      message
    }
  }
`;

export default (graphql(messageQuery, {
  options: (props) => ({
    pollInterval: 5000,
    variables: { channelId: props.match.params.channelId },
  }),
})(MessageList));
