import { Module } from '@nestjs/common';
import { StatusController } from './status/controllers/status.controller';
import { StatusService } from './status/services/status.service';
import { ConfigModule } from '@nestjs/config'; 

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })], 
  controllers: [StatusController],
  providers: [StatusService],
})
export class AppModule {}
