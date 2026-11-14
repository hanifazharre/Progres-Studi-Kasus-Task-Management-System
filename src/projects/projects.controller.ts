import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
@Controller('teams/:teamId/projects')
export class ProjectsController {
  constructor(private readonly service:ProjectsService){}
  @Post() create(@Param('teamId',ParseIntPipe) teamId:number,@Body() dto:CreateProjectDto){return this.service.create(teamId,dto);}
  @Get() findAll(@Param('teamId',ParseIntPipe) teamId:number,@Query() q:PaginationQueryDto){return this.service.findAll(teamId,q);}
  @Get(':id') findOne(@Param('teamId',ParseIntPipe) teamId:number,@Param('id',ParseIntPipe) id:number){return this.service.findOne(teamId,id);}
  @Patch(':id') update(@Param('teamId',ParseIntPipe) teamId:number,@Param('id',ParseIntPipe) id:number,@Body() dto:UpdateProjectDto){return this.service.update(teamId,id,dto);}
  @Delete(':id') remove(@Param('teamId',ParseIntPipe) teamId:number,@Param('id',ParseIntPipe) id:number){return this.service.remove(teamId,id);}
}
