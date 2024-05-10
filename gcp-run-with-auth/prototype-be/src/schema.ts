import {createSchema} from 'graphql-yoga';

const typeDefinitions = `
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

export const schema = createSchema({
  typeDefs: [typeDefinitions],
  resolvers: [resolvers],
});
