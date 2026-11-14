import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
@Controller('tasks/:taskId/comments')
export class CommentsController {
  constructor(private readonly service:CommentsService){}
  @Post() create(@Param('taskId',ParseIntPipe) taskId:number,@Body() dto:CreateCommentDto){return this.service.create(taskId,dto);}
  @Get() findAll(@Param('taskId',ParseIntPipe) taskId:number,@Query() q:PaginationQueryDto){return this.service.findAll(taskId,q);}
}
