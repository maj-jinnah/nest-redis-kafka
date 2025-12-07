import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // DTO-তে নেই এমন কোনো প্রপার্টি রিমুভ করে দেবে
        forbidNonWhitelisted: true, // DTO-তে নেই এমন প্রপার্টি পাঠালে এরর দেবে
        transform: true, // ইনকামিং পেলোডকে স্বয়ংক্রিয়ভাবে DTO টাইপে রূপান্তরিত করবে
        transformOptions: {
          enableImplicitConversion: true, // সব টাইপের জন্য রূপান্তর সক্রিয় করে
        },
      }),
    );

    // I set a global prefix for all routes in the application and now it will be localhost:3000/api
    app.setGlobalPrefix('api');

    await app.listen(process.env.PORT ?? 3000);
  } catch (error) {
    console.error('Error during application bootstrap:', error);
    process.exit(1);
  }
}
bootstrap();
