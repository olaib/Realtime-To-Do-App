import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConnectionModule } from './connection/connection.module';
import { AuthMiddleware } from './auth/middlewares/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .exclude(
  //       {
  //         path: '/',
  //         method: RequestMethod.GET,
  //       }, 
  //       {
  //         path: '/api/',
  //         method: RequestMethod.GET,
  //       },
  //       {
  //         path: '/api/users/login',
  //         method: RequestMethod.POST,
  //       },
  //       {
  //         path: '/api/users',
  //         method: RequestMethod.POST,
  //       },
  //     )
  //     .forRoutes('');
  }
}
