import { GraphQLError } from "graphql";
import { Resolvers } from "../../../__generated__/graphql.js";
import { MyContext } from "../../../types/graphql.js";

export const resolvers: Resolvers<MyContext> = {
  Mutation: {
    removeTodo: async (_, { removeTodoInput }, { prismaClient }, info) => {
      const existingTodo = await prismaClient.todo.findUnique({
        where: {
          id: removeTodoInput.todoId,
        },
      });

      if (!existingTodo) {
        // TODO: handle an error
        throw new GraphQLError("Not found");
      }

      await prismaClient.todo.delete({
        where: {
          id: existingTodo.id,
        },
      });

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
