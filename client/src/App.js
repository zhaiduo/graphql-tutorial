import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { ApolloClient, gql, graphql, ApolloProvider, createNetworkInterface } from 'react-apollo';

import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
//import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { typeDefs } from './schema';

import AddChannel from './components/AddChannel';

import { channelsListQuery, ChannelsList } from './lib';

const schema = makeExecutableSchema({
  typeDefs
});

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql'
});

//to see what the UX would be like if the network was slower
networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);

/*addMockFunctionsToSchema({
  schema
});
const mockNetworkInterface = mockNetworkInterfaceWithSchema({
  schema
});*/

const client = new ApolloClient({
  networkInterface
});
/*const client = new ApolloClient({
  networkInterface: mockNetworkInterface,
});*/

const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={ client }>
        <div className="App">
          <div className="App-header">
            <img
                 src={ logo }
                 className="App-logo"
                 alt="logo" />
            <h2>Welcome to Apollo</h2>
          </div>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
      );
  }
}
export default App;
