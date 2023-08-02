import { Module } from '@nestjs/common';
import { RewardsResolver } from './rewards.resolver';

@Module({
  imports: [],
  providers: [RewardsResolver],
})
export class RewardsModule {}
