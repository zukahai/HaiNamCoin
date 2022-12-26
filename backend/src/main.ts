import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
    await app.listen(process.env.PORT );
}
bootstrap().then(() => {
    console.log('Server started: http://localhost:' + process.env.PORT);
    console.log('API started: http://localhost:' + process.env.PORT + '/api');
});
