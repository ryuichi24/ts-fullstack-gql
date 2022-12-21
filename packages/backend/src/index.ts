import http from "http";

import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { MyContext } from "./types/graphql.js";
import greetTypeDefs from "./modules/root/greet/greet.typeDefs.js";
import greetResolvers from "./modules/root/greet/greet.resolvers.js";
import makeTodoTypeDefs from "./modules/todos/make-todo/make-todo.typeDefs.js";
import makeTodoResolvers from "./modules/todos/make-todo/make-todo.resolvers.js";
import TodoTypeDefs from './modules/root/models/todo.typeDefs.js'

async function main() {
  const PORT = process.env.PORT || 5555;
  const app = express();

  const httpServer = http.createServer(app);
  const server = new ApolloServer<MyContext>({
    typeDefs: mergeTypeDefs([greetTypeDefs, makeTodoTypeDefs, TodoTypeDefs]),
    resolvers: mergeResolvers([greetResolvers, makeTodoResolvers]),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      // eslint-disable-next-line @typescript-eslint/require-await
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  await new Promise<void>((resolve) => {
    httpServer.listen({ port: PORT }, resolve);
  });

  console.log(`🚀 server is up and running at http://localhost:${PORT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
