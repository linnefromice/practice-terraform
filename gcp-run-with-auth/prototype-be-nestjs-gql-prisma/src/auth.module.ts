import { Module } from '@nestjs/common';
import { StatusController, UsersController } from './auth.controller';
import { FirebaseAuthMiddleware } from './auth.middleware';
import { FirebaseService } from './firebase.service';

@Module({
  controllers: [UsersController, StatusController],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class AuthModule {
  configure(consumer) {
    consumer.apply(FirebaseAuthMiddleware).forRoutes(UsersController);
    consumer.apply(FirebaseAuthMiddleware).forRoutes(StatusController);
  }
}
