import { Prisma } from ".prisma/client";
import { GraphQLContext } from "../core/context";

export const signup = async (
  _parent: unknown,
  args: {
    name?: string;
  },
  context: GraphQLContext
) => {
  const firebaseUser = context.firebaseUser;
  if (!firebaseUser) {
    throw new Error("Unauthorized"); // todo: separate error
  }

  const now = new Date();
  const data: Prisma.UserCreateInput = {
    sub: firebaseUser.sub,
    name: args.name || firebaseUser.name || firebaseUser.email || "Anonymous",
    createdAt: now,
    updatedAt: now,
    garden: {
      create: {
        inviteCode: `dummy-code-${now.getTime()}`, // todo: generate random code
        rank: 0,
        sunshine: 0,
        createdAt: now,
        updatedAt: now,
      },
    },
  };
  const res = await context.prisma.user.create({ data: data });
  return {
    id: res.id,
    sub: res.sub,
    name: res.name,
    createdAt: res.createdAt.toISOString(),
    updatedAt: res.updatedAt.toISOString(),
  }; // todo: use response type from auto-generated type by graphql schema
};
