import { Express } from 'express'
import { Connection } from 'mysql2/promise'
import { initDataBase } from './src/services/db'
import { initServer } from './src/services/server'
import { commentsRouter } from './src/api/comments/comments-api'
import { ROOT_PATH } from './src/config/app.constants'
import { errorHandler, notFound } from './src/middleware/error.middleware'
import { productsRouter } from './src/api/products/products-api'

export let server: Express
export let connection: Connection

async function launchApplication() {
	server = initServer()
	connection = await initDataBase()

	initRouter()
}

function initRouter() {
	server.use(`${ROOT_PATH}/comments`, commentsRouter)
	server.use(`${ROOT_PATH}/products`, productsRouter)

	server.use(notFound)
	server.use(errorHandler)
}

launchApplication()
