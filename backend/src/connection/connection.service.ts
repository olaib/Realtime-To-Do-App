import { Injectable } from '@nestjs/common';
import { ConnectionDocument } from './schemas/connection.schema';
import { Connection, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/scemas/user.schema';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectModel(Connection.name)
    private connectionModel: Model<ConnectionDocument>,
  ) {}

  async create( 
    socketId: string,
    connectedUser: User, 
  ): Promise<ConnectionDocument> {
    return this.connectionModel.create({ socketId, connectedUser });
  }

  async findByUser(userId: string): Promise<Connection> {
    return this.connectionModel.findOne({ connectedUser: userId });
  }

  async findBySocketId(
    socketId: string,
  ): Promise<ConnectionDocument> {
    return this.connectionModel.findOne({ socketId }).exec();
  }

  async deleteBySocketId(id:string) {
    await this.connectionModel.findByIdAndDelete({socketId: id});
  }
}
