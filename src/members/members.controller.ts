import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { FindMembersQueryDto } from './dto/find-members-query.dto';
@Controller('teams/:teamId/members')
export class MembersController {
  constructor(private readonly service:MembersService){}
  @Post() create(@Param('teamId',ParseIntPipe) teamId:number,@Body() dto:CreateMemberDto){return this.service.create(teamId,dto);}
  @Get() findAll(@Param('teamId',ParseIntPipe) teamId:number,@Query() q:FindMembersQueryDto){return this.service.findAll(teamId,q);}
  @Get(':id') findOne(@Param('teamId',ParseIntPipe) teamId:number,@Param('id',ParseIntPipe) id:number){return this.service.findOne(teamId,id);}
  @Patch(':id') update(@Param('teamId',ParseIntPipe) teamId:number,@Param('id',ParseIntPipe) id:number,@Body() dto:UpdateMemberDto){return this.service.update(teamId,id,dto);}
  @Delete(':id') remove(@Param('teamId',ParseIntPipe) teamId:number,@Param('id',ParseIntPipe) id:number){return this.service.remove(teamId,id);}
}
