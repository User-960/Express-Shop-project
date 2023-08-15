import { IAuthRequisites } from '@Shared/types/types'
import { NextFunction, Request, Response, Router } from 'express'

import { ADMIN_PATH } from '../../Shared/config/app-constants'

import { verifyRequisites } from '../models/auth.model'

import { throwServerError } from './helper'

export const authRouter = Router()

// export const validateSession = (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	if (req.path.includes('/login') || req.path.includes('/authenticate')) {
// 		next()
// 		return
// 	}

// 	if (req.session?.username) {
// 		next()
// 	} else {
// 		res.redirect(`/${process.env.ADMIN_PATH}/auth/login`)
// 	}
// }

authRouter.get('/login', async (req: Request, res: Response) => {
	try {
		res.render('login')
	} catch (e) {
		throwServerError(res, e)
	}
})

authRouter.post(
	'/authenticate',
	async (req: Request<{}, {}, IAuthRequisites>, res: Response) => {
		try {
			const verified = await verifyRequisites(req.body)

			if (verified) {
				// req.session.username = req.body.username
				res.redirect(`/${ADMIN_PATH}`)
			} else {
				res.redirect(`/${ADMIN_PATH}/auth/login`)
			}
		} catch (e) {
			throwServerError(res, e)
		}
	}
)

authRouter.get('/logout', async (req: Request, res: Response) => {
	try {
		req.session.destroy(e => {
			if (e) {
				console.log('Something wen wrong with session destroying', e)
			}

			res.redirect(`/${ADMIN_PATH}/auth/login`)
		})
	} catch (e) {
		throwServerError(res, e)
	}
})
