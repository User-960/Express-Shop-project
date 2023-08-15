import { IAuthRequisites } from '@Shared/types/types'
import { Request, Response, Router } from 'express'

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
			console.log(req.body)
			res.send('OK')
		} catch (e) {
			throwServerError(res, e)
		}
	}
)
