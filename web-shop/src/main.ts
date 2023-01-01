import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const port = 2712;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    app.useGlobalPipes(new ValidationPipe());
    SwaggerModule.setup('api', app, document);
    await app.listen(port);
    console.error(`Application is running on: http://localhost:${port}`);
    console.error(`Swagger is running on: http://localhost:${port}/api`);
}

bootstrap();
