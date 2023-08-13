import 'colors'
import express, { Express } from 'express'
import morgan from 'morgan'

import {
	LOCAL_PATH,
	LOCAL_PORT,
	NODE_ENV
} from '../../Shared/config/app-constants'

export function initServer(): Express {
	const app = express()

	if (NODE_ENV === 'development') {
		app.use(morgan('dev'))
	}

	const jsonMiddleware = express.json()
	app.use(jsonMiddleware)

	app.listen(LOCAL_PORT, LOCAL_PATH, () => {
		console.log(
			`🚀 Server running in ${NODE_ENV} mode on port ${LOCAL_PORT}`.green.bold
		)
	})

	return app
}
