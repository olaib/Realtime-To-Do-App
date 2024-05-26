import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as MongoSchema } from 'mongoose';
import { Todo } from 'src/todo/scemas/todo.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @ApiProperty()
  @Prop({ type: String, required: true, unique: true })
  username!: string;

  @ApiProperty()
  @Prop({
    min: 8,
    max: 20,
    type: String,
    required: true,
  })
  password!: string;

  @ApiProperty()
  @Prop({
    type: MongoSchema.Types.ObjectId,
    ref: 'Todo',
    default: [],
  })
  tasks!: Todo[];
}

export const UserSchema = SchemaFactory.createForClass(User);
