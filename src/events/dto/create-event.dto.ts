import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ description: '活動標題' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: '活動描述' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: '活動日期' })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({ description: '活動時間' })
  @IsNotEmpty()
  @IsString()
  time: string;

  @ApiProperty({ description: '活動地點' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ description: '組織者 ID' })
  @IsNotEmpty() // organizerId is required
  @IsInt()
  organizerId: number;
}
