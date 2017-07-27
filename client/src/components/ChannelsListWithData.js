import React from 'react';
import { gql, graphql } from 'react-apollo';
import { channelsListQuery, ChannelsList } from '../lib';

export default graphql(channelsListQuery, {
  options: { pollInterval: 5000 },
})(ChannelsList);