const typeDefs = `#graphql
    input MakeTodoInput {
        title: String!
    }

    type MakeTodoResponse {
        todo: Todo!
    }

    type Mutation {
        makeTodo(makeTodoInput: MakeTodoInput!): MakeTodoResponse!
    }
`

export default typeDefs;