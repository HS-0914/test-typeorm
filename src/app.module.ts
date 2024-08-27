import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cats/entity/cats.entity';
import { User } from './auth/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { UserAuthority } from './auth/entity/user-authority.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 13306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [Cat, User, UserAuthority],
      synchronize: false, // 개발할때만 true, 운영할때는 X
      logging: true, //로그에 쿼리문이 보이게 하는 Option
    }),
    CatsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
