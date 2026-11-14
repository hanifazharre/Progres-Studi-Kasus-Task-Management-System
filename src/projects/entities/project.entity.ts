import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import { Task } from '../../tasks/entities/task.entity';
@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn({ unsigned: true }) id: number;
  @Column({ length: 150 }) name: string;
  @Column({ type: 'varchar', length: 2000, nullable: true }) description: string | null;
  @Column({ unsigned: true }) team_id: number;
  @ManyToOne(() => Team, (team) => team.projects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id' }) team: Team;
  @OneToMany(() => Task, (task) => task.project) tasks: Task[];
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
}
