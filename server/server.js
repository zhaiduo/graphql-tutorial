
import express from 'express';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import bodyParser from 'body-parser';

import { schema } from './src/schema';

import cors from 'cors';

//FIXES CORS ERROR
const whitelist = [
    // Allow domains here
    'http://localhost:3000',
];
const corsOptions = {
    origin(origin, callback){
        const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};

const PORT = 4000;
const server = express();

server.use(cors(corsOptions));

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

server.listen(PORT, () =>
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`)
);
//http://localhost:4000/graphql?query={__schema{types{name}}}
