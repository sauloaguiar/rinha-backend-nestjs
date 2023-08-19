import { Controller, Get } from '@nestjs/common';
import { PessoaService } from './pessoa.service';

@Controller('/pessoas')
export class PessoaController {
  constructor(private pessoaService: PessoaService) { }

  @Get('/')
  public async getAll() {
    return await this.pessoaService.getAll();
  }
}
