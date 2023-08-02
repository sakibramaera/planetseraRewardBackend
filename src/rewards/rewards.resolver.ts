import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Parent,
  Args,
  ResolveField,
  Subscription,
  Mutation,
} from '@nestjs/graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { PaginationArgs } from '../common/pagination/pagination.args';
import { UserEntity } from '../common/decorators/user.decorator';
import { User } from '../users/models/user.model';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { RewardIdArgs } from './args/reward-id.args';
import { UserIdArgs } from './args/user-id.args';
import { Reward } from './models/reward.model';
import { RewardConnection } from './models/reward-connection.model';
import { RewardOrder } from './dto/post-order.input';
import { CreateRewardInput } from './dto/createReward.input';

const pubSub = new PubSub();

@Resolver(() => Reward)
export class RewardsResolver {
  constructor(private prisma: PrismaService) { }

  @Subscription(() => Reward)
  rewardCodeCreated() {
    return pubSub.asyncIterator('rewardCodeCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Reward)
  async generateRewardCode(
    @UserEntity() user: User,
    @Args('data') data: CreateRewardInput,
  ) {
    const newReward = this.prisma.reward.create({
      data: {
        rewardCode: data.rewardCode,
        authorId: user.id,
      },
    });
    pubSub.publish('rewardCodeCreated', { rewardCodeCreated: newReward });
    return newReward;
  }

  // @Query(() => RewardConnection)
  async publishedRewards(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => RewardOrder,
      nullable: true,
    })
    orderBy: RewardOrder,
  ) {
    const a = await findManyCursorConnection(
      (args) =>
        this.prisma.reward.findMany({
          include: { author: true },
          where: {
            rewardCode: { contains: query || '' },
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : undefined,
          ...args,
        }),
      () =>
        this.prisma.reward.count({
          where: {
            rewardCode: { contains: query || '' },
          },
        }),
      { first, last, before, after },
    );
    return a;
  }

  @Query(() => [Reward])
  userRewards(@Args() id: UserIdArgs) {
    return this.prisma.user
      .findUnique({ where: { id: id.userId } })
      

    // or
    // return this.prisma.Rewards.findMany({
    //   where: {
    //     published: true,
    //     author: { id: id.userId }
    //   }
    // });
  }

  @Query(() => Reward)
  async reward(@Args() id: RewardIdArgs) {
    return this.prisma.reward.findUnique({ where: { id: id.rewardId } });
  }

  @ResolveField('author', () => User)
  async author(@Parent() reward: Reward) {
    return this.prisma.reward.findUnique({ where: { id: reward.id } }).author();
  }
}
