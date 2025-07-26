import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [NotesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
/// a revisar en caso de error, se tiene que eliminar lo que no sirve de acuerdo al paso 11