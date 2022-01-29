import React from "react";
import ApolloClient from "apollo-boost"; 
import { ApolloProvider } from "react-apollo"; 
//Using ApolloClient to connect with server
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>List of Shoes</h1>
      </div>
    </ApolloProvider>
  );
}

export default App;
