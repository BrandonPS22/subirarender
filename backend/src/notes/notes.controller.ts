import {
  Controller, Get, Post, Body, Param, Delete, Put, Patch, Query
} from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() body: { title: string; content: string }) {
    return this.notesService.create(body);
  }

  @Get()
  findAll(@Query('archived') archived: string) {
    const isArchived = archived === 'true';
    return this.notesService.findAll(isArchived);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { title: string; content: string }) {
    return this.notesService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.delete(+id);
  }

  @Patch(':id/archive')
  toggleArchive(@Param('id') id: string) {
    return this.notesService.toggleArchive(+id);
  }
}
