import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pessoa' })
export class Pessoa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  nome: string;

  @Column({ type: 'varchar' })
  apelido: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  nascimento: Date;

  @Column('text', { array: true })
  stack: string[];
}
