import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const port = process.env.NODE_SERVER_PORT; 간단한 방식
  const configService = app.get(ConfigService);
  const port = configService.get<string>('server.port'); // server.port는 yaml에 있는 server: port: ~ 의 내용
  app.use(cookieParser());
  await app.listen(port);
  console.log(`Application listening on port ${port}`)
}
bootstrap();
