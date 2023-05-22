import { Injectable } from '@nestjs/common';
import { UserInput } from './Input/user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './Entity/user.entity';
import { MongoRepository } from 'typeorm';
import * as uuid from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(input: UserInput): Promise<User> {
    const user = new User();
    user._id = uuid.v4();
    user.username = input.username;
    user.age = input.age;
    user.village = input.village
    return this.userRepository.save(user);
  }

  async getUserById(_id: string) {
    console.log(_id);
    const selectedUser = [
      {
        $match: {
          _id: _id,
        },
      },
      {
        $lookup: {
          from: 'patient',
          localField: '_id',
          foreignField: 'user_id',
          as: 'patientDetail',
        },
      },
    ];
  
    try {
      const result = await this.userRepository.aggregate(selectedUser).toArray();
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch user data');
    }
  }
  



}
