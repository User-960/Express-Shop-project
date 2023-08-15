import { IAuthRequisites } from '@Shared/types/types'
import { Request, Response, Router } from 'express'

import { verifyRequisites } from '../models/auth.model'

import { throwServerError } from './helper'

export const authRouter = Router()

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
				res.redirect(`/${process.env.ADMIN_PATH}`)
			} else {
				res.redirect(`/${process.env.ADMIN_PATH}/auth/login`)
			}
		} catch (e) {
			throwServerError(res, e)
		}
	}
)
