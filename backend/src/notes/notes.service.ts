import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Note } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; content: string }): Promise<Note> {
    return this.prisma.note.create({ data });
  }

  async findAll(archived: boolean): Promise<Note[]> {
    return this.prisma.note.findMany({ where: { archived } });
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.prisma.note.findUnique({ where: { id } });
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  async update(id: number, data: { title: string; content: string }): Promise<Note> {
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
