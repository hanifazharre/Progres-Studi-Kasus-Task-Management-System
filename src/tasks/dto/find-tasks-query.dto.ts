import { Type } from 'class-transformer';
import { IsBooleanString, IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { TaskStatus } from '../../common/enums/task-status.enum';
import { TaskPriority } from '../../common/enums/task-priority.enum';
export class FindTasksQueryDto extends PaginationQueryDto {
  @IsOptional() @IsEnum(TaskStatus) status?: TaskStatus;
  @IsOptional() @IsEnum(TaskPriority) priority?: TaskPriority;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) assigned_member_id?: number;
  @IsOptional() @IsBooleanString() unassigned?: string;
}
