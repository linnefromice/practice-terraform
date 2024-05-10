import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { UserModel } from './graphql.model';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => UserModel)
  async user(): Promise<UserModel> {
    const model = new UserModel();
    model.createdAt = new Date();
    model.updatedAt = new Date();
    model.name = 'string';
    model.sub = 'string';
    return model;
  }

  @Query(() => [UserModel])
  async users(): Promise<UserModel[]> {
    const data = await this.prisma.user.findMany();
    return data;
  }
}
