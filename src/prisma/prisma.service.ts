import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // PrismaClient will be initialized here
    super();
  }

  // NestJS will automatically execute this method when it starts
  async onModuleInit() {
    // Connect to the database here
    await this.$connect();
  }

  // NestJS will automatically execute this method when it is closed.
  async onModuleDestroy() {
    // Disconnect the database connection here
    await this.$disconnect();
  }
}
