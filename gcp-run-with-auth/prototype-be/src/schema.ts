import { createSchema } from "graphql-yoga";
import { GraphQLContext } from "./context";

const typeDefinitions = `
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: (_parent: unknown, _args: {}, _context: GraphQLContext) =>
      "Hello world!",
  },
};

export const schema = createSchema({
  typeDefs: [typeDefinitions],
  resolvers: [resolvers],
});
