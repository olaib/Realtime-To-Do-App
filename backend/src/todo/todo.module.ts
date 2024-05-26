import { Module } from '@nestjs/common';
import { TodoService } from './services/todo.service';
import { TodoGateway } from './todo.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './scemas/todo.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { ConnectionService } from 'src/connection/connection.service';
import { ConnectionModule } from 'src/connection/connection.module';
import { SetupService } from './services/setup.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ], 
  providers: [ TodoService,SetupService]
})
export class TodoModule {}
