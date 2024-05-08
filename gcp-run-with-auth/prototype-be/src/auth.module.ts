import { Module } from '@nestjs/common';
import { AuthController, NoAuthController } from './auth.controller';
import { FirebaseAuthMiddleware } from './auth.middleware';

@Module({
  controllers: [AuthController, NoAuthController],
})
export class AuthModule {
  configure(consumer) {
    consumer.apply(FirebaseAuthMiddleware).forRoutes(AuthController);
  }
}
