import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument, Schema as MongoSchema } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ timestamps: true })
export class Todo {
  @ApiProperty()
  @Prop({ required: true, type: String, unique: true })
  title!: string;

  @Prop({ required: true, type: String, default: '' })
  @ApiProperty()
  description!: string;

  @ApiProperty()
  @Prop({ required: true, type: Boolean, default: false })
  completed!: boolean;

  @ApiProperty()
  @Prop({ required: true, type: Date })
  dueDate?: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
