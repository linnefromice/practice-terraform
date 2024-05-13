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
  console.log(users);
  return users.users.map((user) => user.displayName);
};

@Controller('users')
export class UsersController {
  constructor() {}

  @Get()
  async get(): Promise<string[]> {
    return await users();
  }
}

@Controller('status')
export class StatusController {
  constructor() {}

  @Get()
  async get(@Req() req: RequestWithAuthenticated): Promise<UserRecord> {
    const { uid } = req.user;
    return await user(uid);
  }
}
