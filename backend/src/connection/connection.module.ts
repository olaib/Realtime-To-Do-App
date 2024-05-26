import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectionSchema } from './schemas/connection.schema';
import { Connection } from 'mongoose';
import { ConnectionService } from './connection.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Connection.name, schema: ConnectionSchema }]),
  ],
  providers: [ConnectionService],
  exports: [ConnectionService],
})
export class ConnectionModule {} 
