import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("account_top_scores", (table) => {
      table.integer("account_id").primary();
      table.integer("total_score").defaultTo(0);
    })
    .raw(
      `
        CREATE OR REPLACE FUNCTION update_top_scores()
        RETURNS TRIGGER AS $$
        BEGIN
          INSERT INTO account_top_scores (account_id, total_score)
          VALUES (NEW.account_id, NEW.score)
          ON CONFLICT (account_id)
          DO UPDATE SET total_score = account_top_scores.total_score + NEW.score;
        
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `,
    )
    .raw(
      `
        CREATE TRIGGER scores_update_top_scores
        AFTER INSERT ON scores
        FOR EACH ROW
        EXECUTE FUNCTION update_top_scores();
      `,
    )
    .raw(`CREATE INDEX account_id_index ON account_top_scores (account_id);`);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable("account_top_scores")
    .raw("DROP TRIGGER IF EXISTS scores_update_top_scores ON scores;")
    .raw("DROP FUNCTION IF EXISTS update_top_scores();");
}
