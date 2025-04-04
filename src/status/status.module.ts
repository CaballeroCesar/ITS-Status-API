import { Module } from '@nestjs/common';
import { StatusController } from './controllers/status.controller';
import { StatusService } from './services/status.service';

// As I mentioned before, modules are used for organization
// We can create a child module which can be referenced elsewhere

// Now that we defined a controller, we add it to our modules controllers property
// let's test our helloMessage end point:
// http://localhost:3000/tutorial/helloMessage

// Now that we have defined our service, we add it to our module's provider property
@Module({
    imports: [],
    controllers: [StatusController],
    providers: [StatusService],
})
export class StatusModule {}
