import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import App from "./App";
import "./index.css";

const apolloClient = new ApolloClient({
  uri: "http://localhost:5555/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Todo: {
        fields: {
          createdAt: {
            read(name) {
              return new Date(name);
            },
          },
          updatedAt: {
            read(name) {
              return new Date(name);
            },
          },
        },
      },
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
