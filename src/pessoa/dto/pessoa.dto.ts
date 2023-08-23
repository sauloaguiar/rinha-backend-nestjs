// pessoa.dto.ts
import { Pessoa } from '../../models/pessoa.entity';

export class PessoaDTO implements Readonly<PessoaDTO> {
  id: string;

  nome: string;

  apelido: string;

  nascimento: Date;

  stack: string[];

  public static from(dto: Partial<PessoaDTO>) {
    const it = new PessoaDTO();

    it.nome = dto.nome;
    it.apelido = dto.apelido;
    it.nascimento = dto.nascimento;
    it.stack = dto.stack;
    return it;
  }

  public static fromEntity(entity: Pessoa) {
    return this.from({
      id: entity.id,
      nome: entity.nome,
      nascimento: entity.nascimento,
      apelido: entity.apelido,
      stack: entity.stack,
    });
  }

  public toEntity() {
    const it = new Pessoa();
    it.id = this.id;
    it.nome = this.nome;
    it.nascimento = this.nascimento;
    it.apelido = this.apelido;
    it.stack = this.stack;
    return it;
  }
}
