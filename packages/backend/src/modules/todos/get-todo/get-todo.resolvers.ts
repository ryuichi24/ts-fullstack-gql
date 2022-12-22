import { GraphQLError } from "graphql";
import { Resolvers } from "../../../__generated__/graphql.js";
import { MyContext } from "../../../types/graphql.js";

export const resolvers: Resolvers<MyContext> = {
  Query: {
    getTodo: async (_, { getTodoInput }, { prismaClient }, info) => {
      const existingTodo = await prismaClient.todo.findUnique({
        where: {
          id: getTodoInput.todoId,
        },
      });

      if (!existingTodo) {
        // TODO: handle an error
        throw new GraphQLError("Not found");
      }

      return {
        todo: {
          ...existingTodo,
          updatedAt: existingTodo.updatedAt.toISOString(),
          createdAt: existingTodo.createdAt.toISOString(),
        },
      };
    },
  },
};
