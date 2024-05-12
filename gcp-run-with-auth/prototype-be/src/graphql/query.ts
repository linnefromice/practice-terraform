import { GraphQLContext } from "../core/context";

export const currentUser = async (
  _parent: unknown,
  args: {},
  context: GraphQLContext
) => {
  const firebaseUser = context.firebaseUser;
  if (!firebaseUser) {
    throw new Error("Unauthorized"); // todo: separate error
  }

  const user = await context.prisma.user.findUnique({
    where: { sub: firebaseUser.sub },
  });
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
