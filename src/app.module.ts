import { Module } from '@nestjs/common';
import { StatusController } from './status/controllers/status.controller';
import { StatusService } from './status/services/status.service';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule

@Module({
    // ** Add isGlobal to ConfigModule **
    imports: [ConfigModule.forRoot({ isGlobal: true })], // Ensure the configuration module is set up
    controllers: [StatusController],
    providers: [StatusService],
})
export class AppModule {}
