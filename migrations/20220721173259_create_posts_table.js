/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
	await knex.schema.dropTableIfExists("posts");
	return knex.schema.createTable("posts", function (table) {
		table.increments();
		table.string("title").notNullable();
		table.string("slug").notNullable().unique();
		table.text("content", "longtext").notNullable();
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("posts");
};
