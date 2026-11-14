import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Team } from '../teams/entities/team.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { paginationMeta } from '../common/utils/paginate';
@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private readonly repo: Repository<Project>, @InjectRepository(Team) private readonly teams: Repository<Team>) {}
  private async parent(teamId: number) { const t=await this.teams.findOne({where:{id:teamId}}); if(!t) throw new NotFoundException(`Team with id ${teamId} not found`); return t; }
  async create(teamId: number, dto: CreateProjectDto) { await this.parent(teamId); return this.repo.save(this.repo.create({...dto, team_id:teamId})); }
  async findAll(teamId: number, q: PaginationQueryDto) {
    await this.parent(teamId);
    const [data,total]=await this.repo.findAndCount({where:{team_id:teamId},skip:(q.page-1)*q.limit,take:q.limit,order:{id:'ASC'}});
    return {data,meta:paginationMeta(total,q.page,q.limit)};
  }
  async findOne(teamId:number,id:number) {
    const p=await this.repo.findOne({where:{id,team_id:teamId},relations:{tasks:true}});
    if(!p) throw new NotFoundException(`Project with id ${id} not found in team ${teamId}`);
    const {tasks,...rest}=p; return {...rest,tasks_count:tasks.length};
  }
  async update(teamId:number,id:number,dto:UpdateProjectDto) {
    await this.parent(teamId); const p=await this.repo.findOne({where:{id,team_id:teamId}});
    if(!p) throw new NotFoundException(`Project with id ${id} not found in team ${teamId}`);
    Object.assign(p,dto); return this.repo.save(p);
  }
  async remove(teamId:number,id:number) {
    await this.parent(teamId); const p=await this.repo.findOne({where:{id,team_id:teamId}});
    if(!p) throw new NotFoundException(`Project with id ${id} not found in team ${teamId}`);
    await this.repo.remove(p); return {message:`Project with id ${id} deleted successfully`};
  }
}
