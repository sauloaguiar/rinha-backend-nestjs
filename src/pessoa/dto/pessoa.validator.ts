import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { Pessoa } from '../../models/pessoa.entity';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class PessoaApelidoUnicoRule implements ValidatorConstraintInterface {
  constructor(private readonly pessoaRepository: Repository<Pessoa>) { }

  async validate(name: string) {
    const pessoa = await this.pessoaRepository.find({
      where: [{ nome: name }],
    });
    if (pessoa.length > 0) return false;
  }

  defaultMessage(): string {
    return 'Pessoa com esse apelido ja existe';
  }
}
