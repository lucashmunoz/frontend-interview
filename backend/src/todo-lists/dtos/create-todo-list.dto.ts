import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTodoListDto {
  @ApiProperty({
    description: 'Name of the todo list',
    required: true,
    example: 'Groceries',
  })
  @IsString()
  name: string;
}
