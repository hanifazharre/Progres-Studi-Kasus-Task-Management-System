import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { paginationMeta } from '../common/utils/paginate';
@Injectable()
export class TeamsService {
  constructor(@InjectRepository(Team) private readonly repo: Repository<Team>) {}
  async create(dto: CreateTeamDto) {
    if (await this.repo.findOne({ where: { name: dto.name } })) throw new ConflictException('Team name already exists');
    return this.repo.save(this.repo.create(dto));
  }
  async findAll(q: PaginationQueryDto) {
    const [data, total] = await this.repo.findAndCount({ skip: (q.page-1)*q.limit, take: q.limit, order: { id: 'ASC' } });
    return { data, meta: paginationMeta(total, q.page, q.limit) };
  }
  async findOne(id: number) {
    const team = await this.repo.findOne({ where: { id }, relations: { projects: true, members: true } });
    if (!team) throw new NotFoundException(`Team with id ${id} not found`);
    const { projects, members, ...result } = team;
    return { ...result, projects_count: projects.length, members_count: members.length };
  }
  async update(id: number, dto: UpdateTeamDto) {
    const team = await this.repo.findOne({ where: { id } });
    if (!team) throw new NotFoundException(`Team with id ${id} not found`);
    if (dto.name && dto.name !== team.name && await this.repo.findOne({ where: { name: dto.name } })) throw new ConflictException('Team name already exists');
    Object.assign(team, dto);
    return this.repo.save(team);
  }
  async remove(id: number) {
    const team = await this.repo.findOne({ where: { id } });
    if (!team) throw new NotFoundException(`Team with id ${id} not found`);
    await this.repo.remove(team);
    return { message: `Team with id ${id} deleted successfully` };
  }
}
