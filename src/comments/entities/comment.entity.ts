import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { Member } from '../../members/entities/member.entity';
@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn({ unsigned: true }) id: number;
  @Column({ type: 'text' }) content: string;
  @Column({ unsigned: true }) task_id: number;
  @ManyToOne(() => Task, (task) => task.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' }) task: Task;
  @Column({ unsigned: true }) member_id: number;
  @ManyToOne(() => Member, (member) => member.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'member_id' }) member: Member;
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
}
