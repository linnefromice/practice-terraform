import { createYoga } from "graphql-yoga";
import { createServer } from "http";
import { GraphQLContext, createContext } from "./core/context";
import { initializeFirebaseAdminApp } from "./core/firebase";
import { schema } from "./core/schema";

const main = async () => {
  initializeFirebaseAdminApp();

  const yoga = createYoga<GraphQLContext>({
    schema: schema,
    context: async ({ request }) => createContext({ request }),
  });
  const server = createServer(yoga);

  const port = process.env.PORT ? Number(process.env.PORT) : 4000;
  server.listen(port || 4000, () => {
    console.log(`Server is running on http://localhost:${port}/graphql`);
  });
};

main();
