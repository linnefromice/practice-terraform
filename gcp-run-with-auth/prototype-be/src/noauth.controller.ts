import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller()
export class HelloController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async get(): Promise<string> {
    const count = await this.prisma.user.count();
    console.log(count);
    return 'Hello!';
  }
}
