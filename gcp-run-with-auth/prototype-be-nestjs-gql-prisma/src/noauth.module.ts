import { Module } from '@nestjs/common';
import { HelloController } from './noauth.controller';
import { PrismaModule } from './prisma.module';

@Module({
  controllers: [HelloController],
  imports: [PrismaModule],
})
export class NoauthModule {}
