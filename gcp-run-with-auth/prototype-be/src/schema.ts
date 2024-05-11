import { createSchema } from "graphql-yoga";
import { GraphQLContext } from "./context";

const typeDefinitions = `
  type User {
    id: ID!
    sub: String!
    name: String!
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    hello: String!
    users: [User!]!
  }
`;

const resolvers = {
  Query: {
    hello: (_parent: unknown, _args: {}, _context: GraphQLContext) =>
      "Hello world!",
    users: async (_parent: unknown, _args: {}, context: GraphQLContext) => {
      const data = await context.prisma.user.findMany();
      return data.map(datum => ({
        id: datum.id,
        sub: datum.sub,
        name: datum.name,
        createdAt: datum.createdAt.toISOString(),
        updatedAt: datum.updatedAt.toISOString(),
      }));
    },
  },
};

export const schema = createSchema({
  typeDefs: [typeDefinitions],
  resolvers: [resolvers],
});
