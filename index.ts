import { Express } from 'express'
import { Connection } from 'mysql2/promise'

import { initDataBase } from './Server/services/db'
import { initServer } from './Server/services/server'

import ShopAPI from './Shop.API'

export let server: Express
export let connection: Connection

async function launchApplication() {
	server = initServer()
	connection = await initDataBase()

	initRouter()
}

function initRouter() {
	const shopApi = ShopAPI(connection)
	server.use('/api', shopApi)

	server.use('/', (_, res) => {
		res.status(200)
		res.setHeader('Content-Type', 'text/html; charset=utf-8')
		res.send('React App')
	})
}

launchApplication()
