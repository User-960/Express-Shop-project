import {
	DATABASE,
	HOST_DB,
	PASSWORD_DB,
	PORT_DB,
	USER_DB
} from '@Shared/config/app.constants'
import { Connection, createConnection } from 'mysql2/promise'

export async function initDataBase(): Promise<Connection | null> {
	let connection: Connection | null = null

	try {
		connection = await createConnection({
			host: HOST_DB,
			port: PORT_DB,
			user: USER_DB,
			password: PASSWORD_DB,
			database: DATABASE
		})
	} catch (e) {
		console.error(e.message || e)
		return null
	}

	console.log(`Connection to DB ProductsApplication established`)
	return connection
}
