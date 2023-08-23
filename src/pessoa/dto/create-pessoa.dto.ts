import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { PessoaDTO } from './pessoa.dto';
import { Type } from 'class-transformer';
import { Pessoa } from '../../models/pessoa.entity';

export class CreatePessoaDto implements Omit<PessoaDTO, 'id'> {
  @IsString()
  nome: string;

  @IsNotEmpty({
    context: {
      errorCode: 100,
    },
  })
  @IsString()
  apelido: string;

  @Type(() => Date)
  @IsDate()
  nascimento: Date;

  @ArrayNotEmpty()
  @IsDefined()
  @IsArray()
  stack: string[];

  public static from(dto: Partial<CreatePessoaDto>) {
    const it = new CreatePessoaDto();

    it.nome = dto.nome;
    it.apelido = dto.apelido;
    it.nascimento = dto.nascimento;
    it.stack = dto.stack;
    return it;
  }

  public toEntity() {
    const it = new Pessoa();
    // it.id = uuidv4();
    it.nome = this.nome;
    it.nascimento = this.nascimento;
    it.apelido = this.apelido;
    it.stack = this.stack;
    return it;
  }
}
