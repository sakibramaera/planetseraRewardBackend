import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from '../../common/order/order';

export enum RewardOrderField {
  id = 'id',
  createdAt = 'createdAt',
  rewardCode = 'rewardCode',
}

registerEnumType(RewardOrderField, {
  name: 'RewardOrderField',
  description: 'Properties by which post connections can be ordered.',
});

@InputType()
export class RewardOrder extends Order {
  field: RewardOrderField;
}
