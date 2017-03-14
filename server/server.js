import express from 'express';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';
import bodyParser from 'body-parser';

import { typeDefs } from './src/schema';
import { resolvers } from './src/resolvers';

const PORT = 4000;

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = express();

server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`));
