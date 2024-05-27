import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { TodoService } from './services/todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Socket, Server } from 'socket.io';
import { User } from 'src/users/scemas/user.schema';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { ConnectionService } from 'src/connection/connection.service';

@WebSocketGateway({
  namespace: 'todo',
  cors: { origin: ['http://localhost:3000'] },
})
export class TodoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private readonly todoService: TodoService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly connectionService: ConnectionService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      // if is not verified, this will throw an exeption
      const decodedValidToken = await this.authService.verifyJwt(
        client.handshake.auth.Authorization,
      ); 
      const user: User = await this.usersService.findOne(
        decodedValidToken.user.id,
      );
      if (!user) this.disconnect(client);
      else {
        await this.connectionService.create(client.id, user);

        const todos = await this.todoService.findAll();

        // emit to connected client
        return this.server.to(client.id).emit('todos', todos);
      }
    } catch {
      console.log('discnnecting ...');
      return this.handleDisconnect(client);
    }
  }

  /**
   * handle disconnect from socket
   * remove from db then disconnet
   * @param socket - client socket
   */
  async handleDisconnect(client: Socket) {
    await this.connectionService.deleteBySocketId(client.id);
    client.disconnect();
  }

  @SubscribeMessage('createTodo')
  async create(@MessageBody() createTodoDto: CreateTodoDto): Promise<any> {
    return await this.todoService.create(createTodoDto);
  }

  @SubscribeMessage('findAllTodo')
  async findAll() {
    return await this.todoService.findAll();
  }

  @SubscribeMessage('findOneTodo')
  async findOne(@MessageBody() id: string) {
    return await this.todoService.findOne(id);
  }

  @SubscribeMessage('updateTodo')
  async update(@MessageBody() updateTodoDto: UpdateTodoDto) {
    return await this.todoService.update(updateTodoDto.id, updateTodoDto);
  }

  @SubscribeMessage('removeTodo')
  async remove(@MessageBody() id: number) {
    return await this.todoService.remove(id);
  }
  private disconnect(client: Socket) {
    client.emit('Error', new UnauthorizedException());
    client.disconnect();
  }
}
