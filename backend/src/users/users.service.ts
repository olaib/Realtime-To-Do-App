import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './scemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.usersModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.usersModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.usersModel.findOne({ _id: id }).exec();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: number) {
    return this.usersModel.findByIdAndDelete(id).exec(); 
  }
}
