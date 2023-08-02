import 'reflect-metadata';
import {
  ObjectType,
  registerEnumType,
  HideField,
  Field,
} from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Reward } from '../../rewards/models/reward.model';
import { BaseModel } from '../../common/models/base.model';
// import { Role } from '@prisma/client';

// registerEnumType(Role, {
//   name: 'Role',
//   description: 'User role',
// });

@ObjectType()
export class User extends BaseModel {
  @Field()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  city?: string;


  @Field(() => String, { nullable: true })
  photo?: string;


  @Field(() => [Reward], { nullable: true })
  rewards?: [Reward] | null;

  @HideField()
  password: string;
}
