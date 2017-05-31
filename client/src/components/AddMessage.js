import React from 'react';
import { gql, graphql } from 'react-apollo';
import { messageQuery } from './MessageList';
import { withRouter } from 'react-router';

const AddMessage = ({ mutate, match }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      mutate({
        variables: {
          channelId: match.params.channelId,
          message: evt.target.value
        },
        optimisticResponse: {
          addMessage: {
            message: evt.target.value,
            id: Math.round(Math.random() * -1000000),
            __typename: 'Message',
          },
        },
        update: (store, { data: { addMessage } }) => {
          // Read the data from the cache for this query.
          const data = store.readQuery({
            query: messageQuery,
            variables: {
              channelId: match.params.channelId,
            }
          });
          // Add our Message from the mutation to the end.
          data.messages.push(addMessage);
          // Write the data back to the cache.
          store.writeQuery({
            query: messageQuery,
            variables: {
              channelId: match.params.channelId,
            },
            data
          });
        },
      });
      evt.target.value = '';
    }
  };

  return (
    <div className="messageInput">
      <input
        type="text"
        placeholder="New message"
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

const addMessageMutation = gql`
  mutation addMessage($channelId: ID!, $message: String!) {
    addMessage(channelId: $channelId, message: $message) {
      id
      message
    }
  }
`;


const AddMessageWithMutation = withRouter(graphql(
  addMessageMutation,
)(AddMessage));

export default AddMessageWithMutation;
