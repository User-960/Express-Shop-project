import 'dotenv/config'
import { Express } from 'express'
import { Connection } from 'mysql2/promise'

import { initDataBase } from './Server/services/db'
import { initServer } from './Server/services/server'

import { ADMIN_PATH, API_PATH } from './Shared/config/app-constants'

import ShopAPI from './Shop.API'
import ShopAdmin from './Shop.Admin'

export let server: Express
export let connection: Connection

async function launchApplication() {
	server = initServer()
	connection = await initDataBase()

	initRouter()
}

function initRouter() {
	const shopApi = ShopAPI(connection)
	server.use(`/${API_PATH}`, shopApi)

	const shopAdmin = ShopAdmin()
	server.use(`/${ADMIN_PATH}`, shopAdmin)

	server.use('/', (_, res) => {
		res.status(200)
		res.setHeader('Content-Type', 'text/html; charset=utf-8')
		res.send('React App')
	})
}

launchApplication()
