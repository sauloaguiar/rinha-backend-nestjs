import { Controller, Get } from '@nestjs/common';
import { PessoaService } from './pessoa.service';

@Controller('/')
export class ContagemController {
  constructor(private pessoaService: PessoaService) { }

  @Get('/contagem-pessoas')
  public async getContagem() {
    return await this.pessoaService.getContagem();
  }
}
