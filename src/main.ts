// ** Load these from ConfigService instead **
// ** import * as dotenv from 'dotenv'; **
// ** dotenv.config(); **
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: 'http://localhost:3001',
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: 'Content-Type, Accept, Authorization',
    });

    await app.listen(3000);
    console.log('Server is running on port 3000');
}

bootstrap();
