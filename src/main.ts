import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionsFilter } from './exception/global.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionsFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      // https://github.com/nestjs/nest/pull/4404
      errorHttpStatusCode: 422,
    }),
  );

  await app.listen(3000);
}
bootstrap();
