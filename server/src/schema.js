import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
type Channel {
  id: ID!                # "!" denotes a required field
  name: String
}

type Message {
  id: ID!
  channelId: String
  message: String
}

# This type specifies the entry points into our API. In this case
# there is only one - "channels" - which returns a list of channels.
type Query {
  channels: [Channel]    # "[]" means this is a list of channels
  messages(channelId: ID!): [Message]
}

# The mutation root type, used to define all mutations.
type Mutation {
  # A mutation to add a new channel to the list of channels
  addChannel(name: String!): Channel
  addMessage(channelId: ID!, message: String!): Message
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
