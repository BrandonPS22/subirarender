import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { PrismaModule } from './prisma/prisma.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [NotesModule, PrismaModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
/// a revisar en caso de error, se tiene que eliminar lo que no sirve de acuerdo al paso 11