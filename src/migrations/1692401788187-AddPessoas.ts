import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPessoas1692401788187 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "pessoa" (
        id uuid DEFAULT uuid_generate_v4 (),
        nome varchar NOT NULL,
        apelido varchar NOT NULL,
        nascimento timestamptz NOT NULL DEFAULT now(),
        stack text[],
        primary key (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pessoa"`, undefined);
  }
}
