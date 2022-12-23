import { Resolvers } from "../../../__generated__/graphql.js";
import { MyContext } from "../../../types/graphql.js";

export const resolvers: Resolvers<MyContext> = {
  Query: {
    getTodos: async (_, args, { prismaClient }, info) => {
      const todos = await prismaClient.todo.findMany();

      return {
        todos,
      };
    },
  },
};
