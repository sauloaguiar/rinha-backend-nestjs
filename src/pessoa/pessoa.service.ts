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

  public async getByTerm(term: string) {
    const query = `
      SELECT
          id,
          apelido,
          nome,
          to_char(nascimento, 'YYYY-MM-DD') as nascimento,
          stack
      FROM
          pessoa
      WHERE
        to_tsvector('english', apelido) @@ plainto_tsquery('"${term}":*')
        OR to_tsvector('english', nome) @@ plainto_tsquery('"${term}":*')
        OR to_tsvector('english', stack) @@ plainto_tsquery('"${term}":*')
      LIMIT 50;
    `;
    const rawQuery = await this.pessoaRepository.manager.query(query);

    return rawQuery;
  }

  public async getById(id: string) {
    return await this.pessoaRepository.findOneBy({ id });
  }

  public async create(pessoa: Pessoa) {
    const existingPessoa = await this.pessoaRepository.find({
      where: [{ apelido: pessoa.apelido }],
    });

    if (existingPessoa && existingPessoa.length > 0) {
      throw new UnprocessableEntityException(
        'Pessoa com esse apelido ja existe',
      );
    }

    return await this.pessoaRepository.save(pessoa);
  }

  public async getContagem() {
    return await this.pessoaRepository.count();
  }
}
