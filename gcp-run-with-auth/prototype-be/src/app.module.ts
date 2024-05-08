import { Module } from '@nestjs/common';
import {
  AppController,
  JavaScriptController,
  TypeScriptController,
} from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppController, JavaScriptController, TypeScriptController],
  providers: [AppService],
})
export class AppModule {}
