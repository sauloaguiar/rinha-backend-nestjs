import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { Pessoa } from '../models/pessoa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa])],
  providers: [PessoaService],
  controllers: [PessoaController],
  exports: [TypeOrmModule],
})
export class PessoaModule { }
