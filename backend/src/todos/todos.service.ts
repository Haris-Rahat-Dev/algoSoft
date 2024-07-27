import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Todos, Prisma } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async createTodo(data: Prisma.TodosCreateInput): Promise<Todos> {
    return this.prisma.todos.create({
      data,
      include: { audios: true },
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
      include: { audios: true },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  async updateTodo(params: {
    where: Prisma.TodosWhereUniqueInput;
    data: Prisma.TodosUpdateInput;
  }): Promise<Todos> {
    const { where, data } = params;
    return this.prisma.todos.update({
      data,
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
