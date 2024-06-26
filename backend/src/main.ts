import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WebsocketExceptionsFilter } from './common/filters/ws-exception.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
/**
 * Swagger UI for API documentation and testing the endpoints is available at http://localhost:<PORT>/api
 * @see https://docs.nestjs.com/openapi/introduction
 * @returns {Promise<void>}
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Setup Swagger UI
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new WebsocketExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  const PORT: number = parseInt(process.env.PORT, 10) || 8000;
  await app.listen(PORT);
}
bootstrap();
