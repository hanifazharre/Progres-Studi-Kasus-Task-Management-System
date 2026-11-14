import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Member } from '../../members/entities/member.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { TaskStatus } from '../../common/enums/task-status.enum';
import { TaskPriority } from '../../common/enums/task-priority.enum';
@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn({ unsigned: true }) id: number;
  @Column({ length: 200 }) title: string;
  @Column({ type: 'text', nullable: true }) description: string | null;
  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO }) status: TaskStatus;
  @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.MEDIUM }) priority: TaskPriority;
  @Column({ type: 'date', nullable: true }) due_date: string | null;
  @Column({ unsigned: true }) project_id: number;
  @ManyToOne(() => Project, (project) => project.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' }) project: Project;
  @Column({ unsigned: true, nullable: true }) assigned_member_id: number | null;
  @ManyToOne(() => Member, (member) => member.tasks, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'assigned_member_id' }) assigned_member: Member | null;
  @OneToMany(() => Comment, (comment) => comment.task) comments: Comment[];
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
}
