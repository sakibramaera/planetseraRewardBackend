import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { Reward } from './reward.model';

@ObjectType()
export class RewardConnection extends PaginatedResponse(Reward) { }
