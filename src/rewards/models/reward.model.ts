import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class Reward extends BaseModel {
  @Field()
  rewardCode: string;

  @Field(() => Boolean)
  published: boolean;

  @Field(() => User, { nullable: true })
  author?: User | null;
}
