import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import { Todo } from 'src/todo/scemas/todo.schema';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Username is required' })
  @IsString()
  readonly username!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  readonly password!: string;
}
