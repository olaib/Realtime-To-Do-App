import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from '../scemas/todo.schema';

@Injectable()
export class SetupService implements OnApplicationBootstrap {
  constructor(private readonly todoService: TodoService) {}

  async onApplicationBootstrap() {
    console.log('Setting up todos...');
    // const todos: Todo[] = [
    //   {
    //     title: 'First todo',
    //     description: 'First todo description',
    //     isCompleted: false,
    //   },
    //   {
    //     title: 'Second todo', 
    //     description: 'Second todo description',
    //     isCompleted: false,
    //   },
    // ];
    // await this.todoService.saveAll(todos);
  }
}
