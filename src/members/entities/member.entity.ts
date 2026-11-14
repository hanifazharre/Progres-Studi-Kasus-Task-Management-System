import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import { MemberRole } from '../../common/enums/member-role.enum';
import { Task } from '../../tasks/entities/task.entity';
import { Comment } from '../../comments/entities/comment.entity';
@Entity('members')
export class Member {
  @PrimaryGeneratedColumn({ unsigned: true }) id: number;
  @Column({ length: 100 }) name: string;
  @Column({ length: 150, unique: true }) email: string;
  @Column({ type: 'enum', enum: MemberRole, default: MemberRole.MEMBER }) role: MemberRole;
  @Column({ unsigned: true }) team_id: number;
  @ManyToOne(() => Team, (team) => team.members, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id' }) team: Team;
  @OneToMany(() => Task, (task) => task.assigned_member) tasks: Task[];
  @OneToMany(() => Comment, (comment) => comment.member) comments: Comment[];
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
}
