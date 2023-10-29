import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("scores", function (table) {
    table.increments("id").primary();
    table.integer("account_id").unsigned().notNullable();
    table.integer("score").notNullable();

    table.foreign("account_id").references("id").inTable("accounts");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("scores");
}
