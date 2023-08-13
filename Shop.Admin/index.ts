import express, { Express } from 'express'

import { productsRouter } from './controllers/products.controller'

export default function (): Express {
	const app = express()
	app.use(express.json())

	app.set('view engine', 'ejs')
	app.set('views', 'Shop.Admin/views')

	app.use('/', productsRouter)

	return app
}
