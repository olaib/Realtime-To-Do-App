import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseShema, HydratedDocument } from 'mongoose';
import { User } from 'src/users/scemas/user.schema';

export type ConnectionDocument = HydratedDocument<Connection>;

@Schema({ timestamps: true })
export class Connection {
  @Prop({ required: true })
  socketId: string;
  @Prop({ type: MongooseShema.Types.ObjectId, ref: 'User', required: true })
  connectedUser: User[];
}

export const ConnectionSchema = SchemaFactory.createForClass(Connection);