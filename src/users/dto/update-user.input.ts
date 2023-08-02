import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  city?: string;
  @Field({ nullable: true })
  photo?: string;
}
