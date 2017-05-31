import React, { Component } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
} from 'react-router-dom';

import './App.css';
import ChannelsListWithData from './components/ChannelsListWithData';
import MessageList from './components/MessageList';

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';


const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' });
networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);

const client = new ApolloClient({
  networkInterface,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="App">
            <Link to="/" className="navbar">React + GraphQL Tutorial</Link>
            <Route exact path="/" component={ChannelsListWithData}/>
            <Route path="/:channelId" component={MessageList}/>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
