import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { Team } from '../teams/entities/team.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { FindMembersQueryDto } from './dto/find-members-query.dto';
import { paginationMeta } from '../common/utils/paginate';
@Injectable()
export class MembersService {
  constructor(@InjectRepository(Member) private readonly repo:Repository<Member>, @InjectRepository(Team) private readonly teams:Repository<Team>) {}
  private async parent(teamId:number) { if(!await this.teams.findOne({where:{id:teamId}})) throw new NotFoundException(`Team with id ${teamId} not found`); }
  async create(teamId:number,dto:CreateMemberDto) {
    await this.parent(teamId);
    if(await this.repo.findOne({where:{email:dto.email}})) throw new ConflictException('Email already registered');
    return this.repo.save(this.repo.create({...dto,team_id:teamId}));
  }
  async findAll(teamId:number,q:FindMembersQueryDto) {
    await this.parent(teamId);
    const where:any={team_id:teamId}; if(q.role) where.role=q.role;
    const [data,total]=await this.repo.findAndCount({where,skip:(q.page-1)*q.limit,take:q.limit,order:{id:'ASC'}});
    return {data,meta:paginationMeta(total,q.page,q.limit)};
  }
  async findOne(teamId:number,id:number) {
    const m=await this.repo.findOne({where:{id,team_id:teamId}});
    if(!m) throw new NotFoundException(`Member with id ${id} not found in team ${teamId}`);
    return m;
  }
  async update(teamId:number,id:number,dto:UpdateMemberDto) {
    const m=await this.findOne(teamId,id);
    if(dto.email && dto.email!==m.email && await this.repo.findOne({where:{email:dto.email}})) throw new ConflictException('Email already registered');
    Object.assign(m,dto); return this.repo.save(m);
  }
  async remove(teamId:number,id:number) { const m=await this.findOne(teamId,id); await this.repo.remove(m); return {message:`Member with id ${id} deleted successfully`}; }
}
