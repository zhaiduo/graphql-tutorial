import React from 'react';
import {
  Link
} from 'react-router-dom'

import {
    gql,
    graphql,
} from 'react-apollo';

import AddChannel from './AddChannel';

const ChannelsList = ({ data: {loading, error, channels }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="channelsList">
      <AddChannel />
      { channels.map( ch =>
        (<Link key={ch.id} to={`channel/${ch.id}`}>
          <div className={'channel ' + (ch.id < 0 ? 'optimistic' : '')}>
            {ch.name}
          </div>
        </Link>)
      )}
    </div>
  );
};

export const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

export default graphql(channelsListQuery, {
  options: { pollInterval: 5000 },
})(ChannelsList);
