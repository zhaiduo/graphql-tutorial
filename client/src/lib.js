import React from 'react';
import { gql, graphql } from 'react-apollo';

import AddChannel from './components/AddChannel';

export const channelsListQuery = gql`
   query ChannelsListQuery {
     channels {
       id
       name
     }
   }
 `;

export const ChannelsList = ({data: {loading, error, channels}}) => {
  if (loading) {
    return <p>
             Loading ...
           </p>;
  }
  if (error) {
    return <p>
             { error.message }
           </p>;
  }
  console.log("channels", channels)
  return <div className="App-intro">
           <AddChannel />
           <div className="Item-list">
             { channels.map(ch => <div key={ ch.id } className={'channel ' + (ch.id < 0 ? 'optimistic' : '')}>
                                    { ch.name }
                                  </div>) }
           </div>
         </div>;
  //
};
