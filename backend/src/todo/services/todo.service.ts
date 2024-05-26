import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { Todo, TodoDocument } from '../scemas/todo.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
 
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {
    console.log('TodoService created');
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodoDocument> {
    return this.todoModel.create(createTodoDto);
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findOne(id: string): Promise<Todo | null> {
    return this.todoModel.findOne({ _id: id }).exec();
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.todoModel
      .findByIdAndUpdate(id, updateTodoDto, { new: true })
      .exec();
  }

  async remove(id: number) {
    return this.todoModel.findByIdAndDelete(id).exec(); 
  }

  async saveAll(todos: Todo[]): Promise<Todo[]> {
    return await this.todoModel.create(todos);
  }
}
