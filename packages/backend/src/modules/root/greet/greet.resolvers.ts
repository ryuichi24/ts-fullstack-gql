import { MyContext } from "../../../types/graphql.js";

const resolvers = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/require-await
    greet: async (_: any, args: any, context: MyContext, info: any) => {
      return "hello";
    },
  },
};

export default resolvers;
