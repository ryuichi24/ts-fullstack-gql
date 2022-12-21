import crypto from "crypto";
import { Resolvers } from "../../../__generated__/graphql.js";
import { MyContext } from "../../../types/graphql.js";

const resolvers: Resolvers<MyContext> = {
  Mutation: {
    // eslint-disable-next-line @typescript-eslint/require-await
    makeTodo: async (_, { makeTodoInput }, context, info) => {
      const todoItem = {
        id: crypto.randomUUID(),
        title: makeTodoInput.title,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      return {
        todo: todoItem,
      };
    },
  },
};

export default resolvers;
