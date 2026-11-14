import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Task } from '../tasks/entities/task.entity';
import { Member } from '../members/entities/member.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { paginationMeta } from '../common/utils/paginate';
@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private readonly repo:Repository<Comment>, @InjectRepository(Task) private readonly tasks:Repository<Task>, @InjectRepository(Member) private readonly members:Repository<Member>) {}
  async create(taskId:number,dto:CreateCommentDto) {
    const task=await this.tasks.findOne({where:{id:taskId},relations:{project:true}});
    if(!task) throw new NotFoundException(`Task with id ${taskId} not found`);
    const member=await this.members.findOne({where:{id:dto.member_id}});
    if(!member) throw new NotFoundException(`Member with id ${dto.member_id} not found`);
    if(member.team_id!==task.project.team_id) throw new BadRequestException('Comment author must belong to the project team');
    return this.repo.save(this.repo.create({...dto,task_id:taskId}));
  }
  async findAll(taskId:number,q:PaginationQueryDto) {
    if(!await this.tasks.findOne({where:{id:taskId}})) throw new NotFoundException(`Task with id ${taskId} not found`);
    const [data,total]=await this.repo.findAndCount({where:{task_id:taskId},relations:{member:true},skip:(q.page-1)*q.limit,take:q.limit,order:{created_at:'ASC'}});
    return {data,meta:paginationMeta(total,q.page,q.limit)};
  }
}
