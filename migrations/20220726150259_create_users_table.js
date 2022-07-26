/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
	await knex.schema.dropTableIfExists("users");
	return knex.schema.createTable("users", function (table) {
		table.increments();
		table.string("name");
		table.string("email").notNullable().unique();
		table.string("password").notNullable();
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("users");
};
