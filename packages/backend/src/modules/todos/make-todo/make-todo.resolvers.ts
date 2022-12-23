import { Resolvers } from "../../../__generated__/graphql.js";
import { MyContext } from "../../../types/graphql.js";

export const resolvers: Resolvers<MyContext> = {
  Mutation: {
    makeTodo: async (_, { makeTodoInput }, { prismaClient }, info) => {
      const newTodo = await prismaClient.todo.create({
        data: {
          title: makeTodoInput.title,
        },
      });
      return {
        todo: {
          ...newTodo,
          updatedAt: newTodo.updatedAt,
          createdAt: newTodo.createdAt,
        },
      };
    },
  },
};
