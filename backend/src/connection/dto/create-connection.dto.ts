import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { User } from 'src/users/scemas/user.schema';

export class CreateConnectionDto {
  @ApiProperty()
  @IsString()
  readonly socketId!: string;

  @ApiProperty()
  @Type(() => User)
  readonly connectedUser!: User[];
}

