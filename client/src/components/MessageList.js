import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';

import AddMessage from './AddMessage';
import NotFound from './NotFound';

const MessageList = () => {

  let messages = [{id:'1', text:"Stub Message - To Replace"}];

  return (
    <div className="messagesList">
      { messages.map( message =>
        (<div key={message.id} className={'message ' + (message.id < 0 ? 'optimistic' : '')}>
            {message.text}
        </div>)
      )}
      <AddMessage />
    </div>
  );
};

export default (MessageList);
