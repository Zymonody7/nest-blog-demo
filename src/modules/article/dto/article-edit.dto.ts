import { regPositive } from 'src/utils/regex.util';
import { Matches, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ArticleEditDTO {
  @ApiProperty({
    description: '文章id',
    example: 1,
  })
  @Matches(regPositive, { message: '请输入有效 id' })
  @IsNotEmpty({ message: 'id 不能为空' })
  readonly id: number;
  @ApiProperty({
    description: '文章标题',
    example: '啊！美丽的大海',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty({ message: '请输入文章标题' })
  readonly title?: string;

  @ApiProperty({
    description: '文章描述/简介',
    example: '给你讲述美丽的大海',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty({ message: '请输入文章描述' })
  readonly description?: string;

  @ApiProperty({
    description: '文章内容',
    example: '啊！美丽的大海，你是如此美丽',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty({ message: '请输入文章内容' })
  readonly content?: string;
}
