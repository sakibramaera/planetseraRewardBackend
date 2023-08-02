import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRewardInput {

  @Field()
  @IsNotEmpty()
  rewardCode: string;
}
