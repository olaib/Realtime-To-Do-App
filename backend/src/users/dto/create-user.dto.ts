import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Todo } from 'src/todo/scemas/todo.schema';


export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username!: string;

  @ApiProperty()
  @IsNotEmpty()
  password!: string;

  @ApiProperty()
  @IsArray()
  tasks?: Todo;
}
