import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExceptionInterceptor } from './infrastructure/interceptors/exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('SockHodler Backend')
    .setDescription('SockHodler backend REST API.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ExceptionInterceptor());
  app.enableShutdownHooks();
  app.enableCors();

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
