import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as admin from 'firebase-admin';

const users = async () => {
  const auth = admin.app().auth();

  const users = await auth.listUsers();
  return users.users.map((user) => user.displayName);
};

@Controller('no-auth')
export class NoAuthController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async listUsers(): Promise<string[]> {
    return users();
  }
}

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async listUsers(): Promise<string[]> {
    return users();
  }
}