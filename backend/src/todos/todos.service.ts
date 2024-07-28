import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Todos, Prisma } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class TodosService {
  __dirname;
  constructor(private prisma: PrismaService) {
    this.__dirname = path.resolve();
  }

  async createTodo(data: Prisma.TodosCreateInput): Promise<Todos> {
    return this.prisma.todos.create({
      data,
    });
  }

  async todos(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TodosWhereUniqueInput;
    where?: Prisma.TodosWhereInput;
    orderBy?: Prisma.TodosOrderByWithRelationInput;
  }): Promise<Todos[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.todos.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  removeFile(fileName: string) {
    const filePath = path.join(__dirname, '../../uploads/audios', fileName);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file ${filePath}:`, err);
      } else {
        console.log(`Successfully deleted file: ${filePath}`);
      }
    });
  }

  async updateTodo(params: {
    where: Prisma.TodosWhereUniqueInput;
    data: Prisma.TodosUpdateInput;
    hasFile: boolean;
  }): Promise<Todos> {
    const { where, data, hasFile } = params;
    if (!data.audio || hasFile) {
      // remove the old audio file from the /uploads/audios
      const prevTodo = await this.prisma.todos.findFirst({
        where,
      });
      if (prevTodo.audio) {
        this.removeFile(prevTodo.audio);
      }
    }

    return this.prisma.todos.update({
      data,
      where,
    });
  }

  async completeTodo(params: {
    where: Prisma.TodosWhereUniqueInput;
  }): Promise<Todos> {
    const { where } = params;

    return this.prisma.todos.update({
      data: {
        completed: true,
      },
      where,
    });
  }

  async deleteTodo(where: Prisma.TodosWhereUniqueInput): Promise<Todos> {
    return this.prisma.todos.update({
      data: {
        deleted: true,
      },
      where,
    });
  }
}
