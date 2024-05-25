import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Socket, Server } from 'socket.io';
import { User } from 'src/users/scemas/user.schema';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { UnauthorizedException } from '@nestjs/common';

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

  async handleConnection(socket: Socket) {
    try {
      // if is not verified, this will throw an exeption
      const decodedValidToken = await this.authService.verifyJwt(
        socket.handshake.auth.Authorization,
      );
      const user: User = await this.usersService.findOne(
        decodedValidToken.user.id,
      );
      if (!user) this.disconnect(socket);
      else {
        await this.connectionService.create({
          socketId: socket.id,
          connectedUser: user,
        });

        const todos = await this.todoService.findAll();

        // emit to connected client
        return this.server.to(socket.id).emit('todos', todos);
      }
    } catch {
      console.log('discnnecting ...');
      return this.handleDisconnect(socket);
    }
  }

  /**
   * handle disconnect from socket
   * remove from db then disconnet
   * @param socket - client socket
   */
  async handleDisconnect(socket: Socket) {
    await this.connectionService.deleteBySocketId(socket.id);
    socket.disconnect();
  }

  @SubscribeMessage('createTodo')
  create(@MessageBody() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @SubscribeMessage('findAllTodo')
  findAll() {
    return this.todoService.findAll();
  }

  @SubscribeMessage('findOneTodo')
  findOne(@MessageBody() id: string) {
    return this.todoService.findOne(id);
  }

  @SubscribeMessage('updateTodo')
  update(@MessageBody() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(updateTodoDto.id, updateTodoDto);
  }

  @SubscribeMessage('removeTodo')
  remove(@MessageBody() id: number) {
    return this.todoService.remove(id);
  }
  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }
}
function WebSocketServer(): (target: TodoGateway, propertyKey: "server") => void {
  throw new Error('Function not implemented.');
}

