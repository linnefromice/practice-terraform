import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma.module';
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserResolver],
  imports: [PrismaModule],
})
export class GraphQLModule {}
