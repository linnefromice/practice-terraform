import { createYoga } from "graphql-yoga";
import { createServer } from "http";
import { GraphQLContext, createContext } from "./context";
import { schema } from "./schema";

// schema: GraphQLSchemaWithContext<YogaInitialContext>
// context: Promise<GraphQLContext>
const main = async () => {
  const yoga = createYoga<GraphQLContext>({
    schema: schema,
    context: createContext,
  });
  const server = createServer(yoga);

  server.listen(4000, () => {
    console.log("Server is running on http://localhost:4000/graphql");
  });
};

main();
