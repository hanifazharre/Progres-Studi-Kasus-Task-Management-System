import { IsInt, IsNotEmpty, IsString, MaxLength, Min, MinLength } from 'class-validator';
export class CreateCommentDto {
  @IsString() @IsNotEmpty() @MinLength(1) @MaxLength(2000) content: string;
  @IsInt() @Min(1) member_id: number;
}
