import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todos as TodosModal } from '@prisma/client';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<TodosModal> {
    return this.todosService.createTodo(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todosService.todos({
      where: {
        deleted: false,
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodo: UpdateTodoDto,
  ): Promise<TodosModal> {
    return this.todosService.updateTodo({
      where: { id: +id },
      data: updateTodo,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.deleteTodo({ id: Number(id) });
  }
}
