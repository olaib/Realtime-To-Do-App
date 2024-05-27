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

  @ApiProperty()
  @Prop({
    required: true,
    type: String,
    default: '',
    set: (value: string) => value.trim(),
  })
  description!: string;

  @ApiProperty()
  @Prop({ required: false, type: Boolean, default: false })
  isCompleted?: boolean;

  @ApiProperty()
  @Prop({ type: Date, default: null })
  dueDate?: Date | null;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
