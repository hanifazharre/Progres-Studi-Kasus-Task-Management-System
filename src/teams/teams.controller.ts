import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
@Controller('teams')
export class TeamsController {
  constructor(private readonly service:TeamsService) {}
  @Post() create(@Body() dto:CreateTeamDto){return this.service.create(dto);}
  @Get() findAll(@Query() q:PaginationQueryDto){return this.service.findAll(q);}
  @Get(':id') findOne(@Param('id',ParseIntPipe) id:number){return this.service.findOne(id);}
  @Patch(':id') update(@Param('id',ParseIntPipe) id:number,@Body() dto:UpdateTeamDto){return this.service.update(id,dto);}
  @Delete(':id') remove(@Param('id',ParseIntPipe) id:number){return this.service.remove(id);}
}
