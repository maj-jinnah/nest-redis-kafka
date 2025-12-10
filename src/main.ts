import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    // app.enableCors({
    //   origin: configService.get('CORS_ORIGIN'),
    // });

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

    // Swagger Documentation
    const config = new DocumentBuilder()
      .setTitle('NEST.JS Learning API')
      .setDescription(
        'Doing some experiments with Nest.js framework for learning purposes.',
      )
      .setVersion('1.0')
      .addTag('nest-js')
      // ✅ Add Bearer Token Authentication
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth', // This name will be used in @ApiBearerAuth() decorator
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    // I set a global prefix for all routes in the application and now it will be localhost:3000/api
    app.setGlobalPrefix('api');

    const port = configService.get<number>('PORT') || 3000;
    // console.log(`Application is running on: http://localhost:${port}/api`);

    const env = configService.get<string>('NODE_ENV');
    if (env === 'development') {
      app.enableCors();
    }

    await app.listen(port);
  } catch (error) {
    console.error('Error during application bootstrap:', error);
    process.exit(1);
  }
}
bootstrap();
