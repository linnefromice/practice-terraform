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
    headerAuthorization: String
    users: [User!]!
  }
  type Mutation {
    signup: User!
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
  Mutation: {
    signup: async (_parent: unknown, _args: {}, context: GraphQLContext) => {
      const firebaseUser = context.firebaseUser;
      if (!firebaseUser) {
        throw new Error("Unauthorized");
      }
      const now = new Date();
      const data = await context.prisma.user.create({
        data: {
          sub: firebaseUser.sub,
          name: firebaseUser.name || firebaseUser.email || "Anonymous", // todo: use name arg?
          createdAt: now,
          updatedAt: now,
        },
      });
      return {
        id: data.id,
        sub: data.sub,
        name: data.name,
        createdAt: data.createdAt.toISOString(),
        updatedAt: data.updatedAt.toISOString(),
      };
    },
  },
};

export const schema = createSchema({
  typeDefs: [typeDefinitions],
  resolvers: [resolvers],
});
