import { NextFunction, Request, Response } from 'express'

import { NODE_ENV } from '../../../Shared/config/app.constants'

export const notFound = (req: Request, res: Response, next: NextFunction) => {
	const error = new Error(`Not found - ${req.originalUrl}`)
	res.status(404)
	next(error)
}

export const errorHandler = (err: Error, req: Request, res: Response, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode
	res.status(statusCode)
	res.json({
		message: err.message,
		stack: NODE_ENV === 'production' ? null : err.stack
	})
}
