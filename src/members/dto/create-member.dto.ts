import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { MemberRole } from '../../common/enums/member-role.enum';
export class CreateMemberDto {
  @IsString() @IsNotEmpty() @MinLength(2) @MaxLength(100) name: string;
  @IsEmail() @MaxLength(150) email: string;
  @IsOptional() @IsEnum(MemberRole) role?: MemberRole;
}
