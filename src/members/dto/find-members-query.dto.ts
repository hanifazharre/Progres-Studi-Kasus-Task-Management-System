import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { MemberRole } from '../../common/enums/member-role.enum';
export class FindMembersQueryDto extends PaginationQueryDto {
  @IsOptional() @IsEnum(MemberRole) role?: MemberRole;
}
