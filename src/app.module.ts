import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './modules/article/article.module';
import { Article } from './modules/article/entity/article.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'abc123456',
      database: 'blog-serve',
      entities: [Article],
      synchronize: true,
    }),
    ArticleModule,
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
