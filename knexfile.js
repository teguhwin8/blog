// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require("dotenv").config({ path: ".env.local" });

module.exports = {
	development: {
		client: "mysql",
		connection: {
			host: process.env.DB_HOST,
			port: 3306,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
		},
	},
};
