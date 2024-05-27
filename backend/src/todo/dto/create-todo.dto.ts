import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Title is required'})
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsBoolean({ message: 'Invalid boolean format' })
  @IsOptional()
  isCompleted!: boolean;

  @ApiProperty()
  @IsDate({ message: 'Invalid date format' })
  @IsOptional()
  dueDate?: Date;
}
