import { Knex } from 'knex';

/*
    Migrations are modified for testing purposes.
    In a production environment, migrations should not be altered.
 */

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table
            .uuid('user_id')
            .defaultTo(knex.raw(/* sql */ `uuid_generate_v4()`))
            .primary()
            .notNullable();
        table.string('username', 30).unique().notNullable();
        table.string('first_name', 50).notNullable();
        table.string('last_name', 50).notNullable();
        table.string('email', 255).notNullable();
        table.boolean('is_admin').defaultTo(false).notNullable();
        table.string('password', 255).notNullable();
        table.string('password_reset_token', 36);
        table.timestamp('password_reset_token_expiration', { useTz: false });
        table.point('home_gps').nullable();
        table.point('work_gps').nullable();
        table.specificType('calendars', 'TEXT[]').nullable();
        table.text('locale').defaultTo('en-US').nullable();
        table.text('time_zone').defaultTo('Etc/Zulu').nullable();
        table.dateTime('created_at').defaultTo('now()').notNullable();
        table.string('created_by', 30).defaultTo('system').notNullable();
        table.dateTime('updated_at').defaultTo('now()').notNullable();
        table.string('updated_by', 30).defaultTo('system').notNullable();
        table.boolean('is_approved').defaultTo(false).notNullable();
    });
    await knex.raw(/* sql */ `ALTER TABLE "users" OWNER TO postgres;`);
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
}
