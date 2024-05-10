import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { NoauthModule } from './noauth.module';

@Module({
  imports: [AuthModule, NoauthModule],
})
export class AppModule {}
