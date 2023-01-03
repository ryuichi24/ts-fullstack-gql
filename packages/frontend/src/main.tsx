import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import App from "./App";
import "./index.css";
import { DarkModeProvider } from "./context/DarkModeContext";

const apolloClient = new ApolloClient({
  uri: "http://localhost:5555/graphql",
  cache: new InMemoryCache({
    // https://www.apollographql.com/docs/react/caching/cache-field-behavior/#the-read-function
    typePolicies: {
      Todo: {
        fields: {
          createdAt: {
            read(value) {
              return new Date(value);
            },
          },
          updatedAt: {
            read(value) {
              return new Date(value);
            },
          },
        },
      },
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DarkModeProvider>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </DarkModeProvider>
  </React.StrictMode>
);
