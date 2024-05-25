import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoGateway } from './todo.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './scemas/todo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  providers: [TodoGateway, TodoService],
})
export class TodoModule {}
