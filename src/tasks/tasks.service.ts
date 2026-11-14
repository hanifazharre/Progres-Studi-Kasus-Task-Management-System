import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Project } from '../projects/entities/project.entity';
import { Member } from '../members/entities/member.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AssignTaskDto } from './dto/assign-task.dto';
import { FindTasksQueryDto } from './dto/find-tasks-query.dto';
import { paginationMeta } from '../common/utils/paginate';
@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly repo:Repository<Task>, @InjectRepository(Project) private readonly projects:Repository<Project>, @InjectRepository(Member) private readonly members:Repository<Member>) {}
  private async project(id:number) { const p=await this.projects.findOne({where:{id}}); if(!p) throw new NotFoundException(`Project with id ${id} not found`); return p; }
  private async validateAssignee(memberId:number|null|undefined,teamId:number) {
    if(memberId===undefined || memberId===null) return;
    const m=await this.members.findOne({where:{id:memberId}});
    if(!m) throw new NotFoundException(`Member with id ${memberId} not found`);
    if(m.team_id!==teamId) throw new BadRequestException('Assigned member must belong to the project team');
  }
  async create(projectId:number,dto:CreateTaskDto) {
    const p=await this.project(projectId); await this.validateAssignee(dto.assigned_member_id,p.team_id);
    return this.repo.save(this.repo.create({...dto,project_id:projectId}));
  }
  async findAll(projectId:number,q:FindTasksQueryDto) {
    await this.project(projectId);
    const qb=this.repo.createQueryBuilder('task').leftJoinAndSelect('task.assigned_member','assigned_member').where('task.project_id = :projectId',{projectId});
    if(q.status) qb.andWhere('task.status = :status',{status:q.status});
    if(q.priority) qb.andWhere('task.priority = :priority',{priority:q.priority});
    if(q.assigned_member_id) qb.andWhere('task.assigned_member_id = :memberId',{memberId:q.assigned_member_id});
    if(q.unassigned==='true') qb.andWhere('task.assigned_member_id IS NULL');
    const [data,total]=await qb.orderBy('task.id','ASC').skip((q.page-1)*q.limit).take(q.limit).getManyAndCount();
    return {data,meta:paginationMeta(total,q.page,q.limit)};
  }
  async findOne(projectId:number,id:number) {
    const t=await this.repo.findOne({where:{id,project_id:projectId},relations:{assigned_member:true,comments:true}});
    if(!t) throw new NotFoundException(`Task with id ${id} not found in project ${projectId}`);
    const {comments,...rest}=t; return {...rest,comments_count:comments.length};
  }
  async update(projectId:number,id:number,dto:UpdateTaskDto) {
    const p=await this.project(projectId); const t=await this.repo.findOne({where:{id,project_id:projectId}});
    if(!t) throw new NotFoundException(`Task with id ${id} not found in project ${projectId}`);
    await this.validateAssignee(dto.assigned_member_id,p.team_id); Object.assign(t,dto); return this.repo.save(t);
  }
  async assign(projectId:number,id:number,dto:AssignTaskDto) {
    const p=await this.project(projectId); const t=await this.repo.findOne({where:{id,project_id:projectId}});
    if(!t) throw new NotFoundException(`Task with id ${id} not found in project ${projectId}`);
    await this.validateAssignee(dto.assigned_member_id,p.team_id);
    t.assigned_member_id=dto.assigned_member_id; return this.repo.save(t);
  }
  async remove(projectId:number,id:number) {
    const t=await this.repo.findOne({where:{id,project_id:projectId}});
    if(!t) throw new NotFoundException(`Task with id ${id} not found in project ${projectId}`);
    await this.repo.remove(t); return {message:`Task with id ${id} deleted successfully`};
  }
}
