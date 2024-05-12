import { PrismaClient } from "@prisma/client";
import * as admin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { prisma } from "./prisma";

export type GraphQLContext = {
  prisma: PrismaClient;
  firebaseUser?: FirebaseUser;
};

export async function createContext({
  request,
}: {
  request: Request;
}): Promise<GraphQLContext> {
  const authorization = request.headers.get("authorization");
  const firebaseUser = authorization
    ? await getFirebaseUser(authorization)
    : undefined;
  return {
    prisma: prisma,
    firebaseUser: firebaseUser,
  };
}

type FirebaseUser = Pick<DecodedIdToken, "sub" | "email"> & { name?: string };
const AUTHORIZATION_HEADER_PREFIX = "Bearer ";
const getFirebaseUser = async (
  authorization: string
): Promise<FirebaseUser> => {
  const token = authorization.slice(AUTHORIZATION_HEADER_PREFIX.length);
  const decodedIdToken = await admin
    .auth()
    .verifyIdToken(token)
    .catch(() => {
      throw new Error("Unauthorized");
    });

  return {
    sub: decodedIdToken.sub,
    email: decodedIdToken.email,
    name: decodedIdToken.name,
  };
};
