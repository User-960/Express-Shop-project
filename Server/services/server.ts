import 'colors'
import express, { Express } from 'express'
import morgan from 'morgan'

import {
	LOCAL_HOST,
	NODE_ENV,
	PORT_SERVER
} from '../../Shared/config/app.constants'

export function initServer(): Express {
	const app = express()

	if (NODE_ENV === 'development') {
		app.use(morgan('dev'))
	}

	const jsonMiddleware = express.json()
	app.use(jsonMiddleware)

	app.listen(PORT_SERVER, LOCAL_HOST, () => {
		console.log(
			`🚀 Server running in ${NODE_ENV} mode on port ${PORT_SERVER}`.green.bold
		)
	})

	return app
}
