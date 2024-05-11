import { createYoga } from "graphql-yoga";
import { createServer } from "http";
import { GraphQLContext, createContext } from "./context";
import { initializeFirebaseAdminApp } from "./firebase";
import { schema } from "./schema";

const main = async () => {
  initializeFirebaseAdminApp();

  const yoga = createYoga<GraphQLContext>({
    schema: schema,
    context: async ({ request }) => createContext({ request }),
  });
  const server = createServer(yoga);

  server.listen(4000, () => {
    console.log("Server is running on http://localhost:4000/graphql");
  });
};

main();
