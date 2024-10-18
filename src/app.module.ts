import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Set as a global module, all services can use the configuration
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
