import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';

@Controller('/pessoas')
export class PessoaController {
  constructor(private pessoaService: PessoaService) { }

  @Get('/')
  public async getAll(@Query('t') t: string) {
    if (!t) {
      return await this.pessoaService.getAll();
    }

    return await this.pessoaService.getByTerm(t);
  }

  @Get('/:id')
  public async getById(@Param('id') id: string) {
    const pessoa = await this.pessoaService.getById(id);
    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }
    return await this.pessoaService.getById(id);
  }

  @Post('/')
  public async create(@Body() pessoa: CreatePessoaDto) {
    console.log(pessoa);
    return await this.pessoaService.create(pessoa.toEntity());
  }
}
