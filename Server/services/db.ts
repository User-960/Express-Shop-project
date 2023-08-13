import { Connection, createConnection } from 'mysql2/promise'

import {
	DB_HOST,
	DB_NAME,
	DB_PASSWORD,
	DB_PORT,
	DB_USER
} from '../../Shared/config/app-constants'

export async function initDataBase(): Promise<Connection | null> {
	let connection: Connection | null = null

	try {
		connection = await createConnection({
			host: DB_HOST,
			port: DB_PORT,
			user: DB_USER,
			password: DB_PASSWORD,
			database: DB_NAME
		})
	} catch (e) {
		console.error(e.message || e)
		return null
	}

	console.log(`Connection to DB ProductsApplication established`)
	return connection
}
