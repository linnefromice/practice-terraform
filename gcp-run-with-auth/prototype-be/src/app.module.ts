import { Module } from '@nestjs/common';
import {
  AppController,
  JavaScriptController,
  TypeScriptController,
} from './app.controller';
import { AppService } from './app.service';
import { AuthController, NoAuthController } from './auth.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    JavaScriptController,
    TypeScriptController,
    AuthController,
    NoAuthController,
  ],
  providers: [AppService],
})
export class AppModule {}
