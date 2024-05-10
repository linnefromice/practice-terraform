import { Module } from '@nestjs/common';
import { HelloController } from './noauth.controller';
import { PrismaService } from './prisma.service';

@Module({
  controllers: [HelloController],
  providers: [PrismaService],
})
export class NoauthModule {}
