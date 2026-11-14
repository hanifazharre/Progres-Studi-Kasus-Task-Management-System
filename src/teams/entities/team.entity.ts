import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Member } from '../../members/entities/member.entity';
@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn({ unsigned: true }) id: number;
  @Column({ length: 100, unique: true }) name: string;
  @Column({ type: 'varchar', length: 1000, nullable: true }) description: string | null;
  @OneToMany(() => Project, (project) => project.team) projects: Project[];
  @OneToMany(() => Member, (member) => member.team) members: Member[];
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
}
