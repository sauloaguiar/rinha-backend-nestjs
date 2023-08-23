import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pessoa } from '../models/pessoa.entity';

@Injectable()
export class PessoaService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) { }

  public async getAll() {
    return await this.pessoaRepository.find();
  }

  public async getById(id: string) {
    return await this.pessoaRepository.findOneBy({ id });
  }

  public async create(pessoa: Pessoa) {
    const existingPessoa = await this.pessoaRepository.find({
      where: [{ apelido: pessoa.apelido }],
    });

    if (existingPessoa) {
      throw new UnprocessableEntityException(
        'Pessoa com esse apelido ja existe',
      );
    }

    const a = await this.pessoaRepository.create(pessoa);
    console.log('pessoa', a);
    const b = await this.pessoaRepository.save(a);
    console.log('return', b);
    return b;
  }

  public async getContagem() {
    return await this.pessoaRepository.count();
  }
}
