import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './Entity/user.entity';
import { UserInput } from './Input/user.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: UserInput) {
    return await this.userService.create(input);
  }


@Query(() => User)
async FindTheUser(@Args('_id') _id: string) {
  return await this.userService.getUserById(_id);
}

}
