import { Module } from '@nestjs/common';
import { TodoService } from './services/todo.service';
import { TodoGateway } from './todo.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './scemas/todo.schema';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConnectionModule } from 'src/connection/connection.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConnectionModule,  
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  providers: [
    TodoService,
    TodoGateway,
  ],
})
export class TodoModule {}
