import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AssignTaskDto } from './dto/assign-task.dto';
import { FindTasksQueryDto } from './dto/find-tasks-query.dto';
@Controller('projects/:projectId/tasks')
export class TasksController {
  constructor(private readonly service:TasksService){}
  @Post() create(@Param('projectId',ParseIntPipe) projectId:number,@Body() dto:CreateTaskDto){return this.service.create(projectId,dto);}
  @Get() findAll(@Param('projectId',ParseIntPipe) projectId:number,@Query() q:FindTasksQueryDto){return this.service.findAll(projectId,q);}
  @Get(':id') findOne(@Param('projectId',ParseIntPipe) projectId:number,@Param('id',ParseIntPipe) id:number){return this.service.findOne(projectId,id);}
  @Patch(':id') update(@Param('projectId',ParseIntPipe) projectId:number,@Param('id',ParseIntPipe) id:number,@Body() dto:UpdateTaskDto){return this.service.update(projectId,id,dto);}
  @Patch(':id/assign') assign(@Param('projectId',ParseIntPipe) projectId:number,@Param('id',ParseIntPipe) id:number,@Body() dto:AssignTaskDto){return this.service.assign(projectId,id,dto);}
  @Delete(':id') remove(@Param('projectId',ParseIntPipe) projectId:number,@Param('id',ParseIntPipe) id:number){return this.service.remove(projectId,id);}
}
