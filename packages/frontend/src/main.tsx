import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { DarkModeProvider } from "./contexts/DarkModeContext";

const apolloClient = new ApolloClient({
  uri: "http://localhost:5555/graphql",
  cache: new InMemoryCache({
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
