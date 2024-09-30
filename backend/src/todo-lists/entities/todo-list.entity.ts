import { TodoItem } from './todo-item.entity';
import { ApiProperty } from "@nestjs/swagger";

export class TodoList {
    @ApiProperty({
      description: 'ID of the todo list',
      example: 1,
    })
    id: number;

    @ApiProperty({
      description: 'Name of the todo list',
      example: 'Groceries',
    })
    name: string;

    @ApiProperty({
      description: 'List of todo items',
      example: [{
        id: 1,
        name: 'Buy milk',
        description: 'Buy a gallon of milk from the store',
        done: false,
      }],
    })
    todoItems: TodoItem[];
  }
  