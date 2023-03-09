import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';
import { regPositive } from 'src/utils/regex.util';
export class ListDTO {
  @ApiProperty({
    description: '第几页',
    example: 1,
    required: false,
  })
  @Matches(regPositive, { message: 'page不能为负数' })
  readonly page: number;
  @ApiProperty({
    description: '每页数据条数',
    example: 5,
    required: false,
  })
  @Matches(regPositive, { message: 'limit不能为负数' })
  readonly limit: number;
}
