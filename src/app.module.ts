import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Set as a global module, all services can use the configuration
  }), AuthModule],
  controllers: [AuthController, EventsController, UsersController],
  providers: [AuthService, EventsService, UsersService, PrismaService],
})
export class AppModule {}
