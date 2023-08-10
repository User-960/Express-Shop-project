import { Express } from 'express'
import { Connection } from 'mysql2/promise'

import { initDataBase } from './Server/services/db'
import { initServer } from './Server/services/server'

export let server: Express
export let connection: Connection | null

async function launchApplication() {
	server = initServer()
	connection = await initDataBase()

	initRouter()
}

function initRouter() {}

launchApplication()
