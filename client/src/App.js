import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { ApolloClient, gql, graphql, ApolloProvider, } from 'react-apollo';

import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { typeDefs } from './schema';
const schema = makeExecutableSchema({
  typeDefs
});
addMockFunctionsToSchema({
  schema
});
const mockNetworkInterface = mockNetworkInterfaceWithSchema({
  schema
});

//const client = new ApolloClient();
const client = new ApolloClient({
  networkInterface: mockNetworkInterface,
});

/*const ChannelsList = () => (<ul>
                              <li>
                                Channel 1
                              </li>
                              <li>
                                Channel 2
                              </li>
                            </ul>);*/

const channelsListQuery = gql`
   query ChannelsListQuery {
     channels {
       id
       name
     }
   }
 `;

const ChannelsList = ({data: {loading, error, channels}}) => {
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
  return <div className="App-intro"><ul className="Item-list">
           { channels.map(ch => <li key={ ch.id }>
                                  { ch.name }
                                </li>) }
         </ul></div>;
};
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
