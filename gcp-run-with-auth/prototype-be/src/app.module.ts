import { Module } from '@nestjs/common';
import {
  AppController,
  JavaScriptController,
  TypeScriptController,
} from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, JavaScriptController, TypeScriptController],
  providers: [AppService],
})
export class AppModule {}
