import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

type User = Pick<DecodedIdToken, 'uid' | 'email'> & { name?: string };
export type RequestWithAuthenticated = Request & { user: User };

const AUTHORIZATION_HEADER_PREFIX = 'Bearer ';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  async use(req: RequestWithAuthenticated, _: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (
      !authorization ||
      !authorization.startsWith(AUTHORIZATION_HEADER_PREFIX)
    )
      throw new UnauthorizedException();

    const token = authorization.slice(AUTHORIZATION_HEADER_PREFIX.length);
    const decodedIdToken = await admin
      .auth()
      .verifyIdToken(token)
      .catch(() => {
        throw new UnauthorizedException();
      });

    console.log(decodedIdToken); // debug
    req.user = { ...decodedIdToken };

    next();
  }
}
