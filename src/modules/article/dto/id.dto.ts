import { regPositive } from 'src/utils/regex.util';
import { Matches, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class IdDTO {
  @ApiProperty({
    description: '文章id',
    example: 1,
  })
  @Matches(regPositive, { message: '请输入有效 id' })
  @IsNotEmpty({ message: 'id 不能为空' })
  readonly id: number;
}
