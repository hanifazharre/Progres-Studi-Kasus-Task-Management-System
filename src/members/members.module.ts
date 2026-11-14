import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Team } from '../teams/entities/team.entity';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
@Module({
  imports: [TypeOrmModule.forFeature([Member, Team])],
  controllers: [MembersController],
  providers: [MembersService],
  exports: [MembersService],
})
export class MembersModule {}
