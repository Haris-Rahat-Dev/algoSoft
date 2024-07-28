import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todos as TodosModal } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { diskStorage } from 'multer';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('audioFile', {
      storage: diskStorage({
        destination: './uploads/audios',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  create(
    @Body() createTodoDto: CreateTodoDto,
    @UploadedFile() audioFile: Express.Multer.File,
  ): Promise<TodosModal> {
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
  @UseInterceptors(
    FileInterceptor('audioFile', {
      storage: diskStorage({
        destination: './uploads/audios',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateTodo: UpdateTodoDto,
    @UploadedFile() audio: Express.Multer.File,
  ): Promise<TodosModal> {
    return this.todosService.updateTodo({
      where: { id: +id },
      data: updateTodo,
      hasFile: !!audio,
    });
  }

  @Patch('completeTodo/:id')
  completeTodo(@Param('id') id: string): Promise<TodosModal> {
    return this.todosService.completeTodo({
      where: { id: +id },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.deleteTodo({ id: Number(id) });
  }
}
