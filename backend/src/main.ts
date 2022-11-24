import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AtGuard } from './auth/guards/at.guard';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    // add Bearer token to swagger
    const options = new DocumentBuilder()
        .setTitle('HaiNamCoin')
        .setDescription('AutoBank API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap().then(() => {
    console.log('Server started: http://localhost:3000');
    console.log('API started: http://localhost:3000/api');
});
