import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';


const ChannelName = ({ data: {loading, error, channel } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="channelName">
      {channel.name}
    </div>
  );
};

export const channelQuery = gql`
  query ChannelQuery($channelId : ID!) {
    channel(id: $channelId) {
      id
      name
    }
  }
`;

export default (graphql(channelQuery, {
  options: (props) => ({
    variables: { channelId: props.channelId },
  }),
})(ChannelName));
