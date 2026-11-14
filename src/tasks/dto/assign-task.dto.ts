import { IsInt, Min, ValidateIf } from 'class-validator';
export class AssignTaskDto {
  @ValidateIf((o) => o.assigned_member_id !== null)
  @IsInt() @Min(1)
  assigned_member_id: number | null;
}
