import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { Pessoa } from '../models/pessoa.entity';
import { ContagemController } from './contagem.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa])],
  providers: [PessoaService],
  controllers: [PessoaController, ContagemController],
  exports: [TypeOrmModule],
})
export class PessoaModule { }
