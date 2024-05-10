import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { Module } from '@nestjs/common';
import { GraphQLModule as NestjsGraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth.module';
import { GraphQLModule } from './graphql/graphql.module';
import { NoauthModule } from './noauth.module';

@Module({
  imports: [
    AuthModule,
    NoauthModule,
    GraphQLModule,
    NestjsGraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      sortSchema: true,
    }),
  ],
})
export class AppModule {}
