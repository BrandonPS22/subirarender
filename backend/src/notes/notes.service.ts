import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Note } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; content: string; tagId?: number }): Promise<Note> {
    return this.prisma.note.create({
      data: {
        title: data.title,
        content: data.content,
        ...(data.tagId && {
          tag: {
            connect: { id: data.tagId },
          },
        }),
      },
    });
  }

  async findAll(archived: boolean, tagId?: number): Promise<Note[]> {
    return this.prisma.note.findMany({
      where: {
        archived,
        tagId: tagId ?? undefined,
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.prisma.note.findUnique({ where: { id } });
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  async update(id: number, data: { title: string; content: string; tagId?: number }): Promise<Note> {
    return this.prisma.note.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Note> {
    return this.prisma.note.delete({ where: { id } });
  }

  async toggleArchive(id: number): Promise<Note> {
    const note = await this.findOne(id);
    return this.prisma.note.update({
      where: { id },
      data: { archived: !note.archived },
    });
  }
}