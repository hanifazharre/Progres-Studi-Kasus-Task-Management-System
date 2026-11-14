import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
export class CreateProjectDto {
  @IsString() @IsNotEmpty() @MinLength(3) @MaxLength(150) name: string;
  @IsOptional() @IsString() @MaxLength(2000) description?: string;
}
