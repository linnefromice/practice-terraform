import * as fs from "fs";
import { createSchema } from "graphql-yoga";
import * as path from "path";
import { signup } from "../graphql/mutation";
import { currentUser } from "../graphql/query";
import { GraphQLContext } from "./context";

const resolvers = {
  Query: {
    currentUser: currentUser,
    // examples
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
    signup: signup,
  },
};

export const schema = createSchema({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers: [resolvers],
});
