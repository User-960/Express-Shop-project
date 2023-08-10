import express, { Express } from 'express'
import { Connection } from 'mysql2/promise'

import { commentsRouter } from './src/api/comments/comments-api'
import { productsRouter } from './src/api/products/products-api'
import { errorHandler, notFound } from './src/middleware/error.middleware'

export let connection: Connection

export default function (dbConnection: Connection): Express {
	const app = express()
	app.use(express.json())

	connection = dbConnection

	app.use('/comments', commentsRouter)
	app.use('/products', productsRouter)

	app.use(notFound)
	app.use(errorHandler)

	return app
}
