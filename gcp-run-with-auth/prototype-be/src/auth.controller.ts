import { Controller, Get, Req } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { RequestWithAuthenticated } from './auth.middleware';

const user = async (uid: string) => {
  const auth = admin.app().auth();
  return await auth.getUser(uid);
};

const users = async () => {
  const auth = admin.app().auth();

  const users = await auth.listUsers();
  return users.users.map((user) => user.displayName);
};

@Controller('no-auth')
export class NoAuthController {
  constructor() {}

  @Get()
  async listUsers(): Promise<string[]> {
    return users();
  }
}

@Controller('auth')
export class AuthController {
  constructor() {}

  @Get()
  async currentUser(@Req() req: RequestWithAuthenticated): Promise<UserRecord> {
    const { uid } = req.user;
    return await user(uid);
  }
}
