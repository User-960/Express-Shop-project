import { IAuthRequisites } from '@Shared/types/types'
import { Request, Response, Router } from 'express'
import { body, validationResult } from 'express-validator'

import { connection } from '../../..'
import { IUserRequisitesEntity } from '../../types/types'

export const authRouter = Router()

authRouter.post(
	'/',
	[
		body('username').notEmpty().withMessage('Username is required'),
		body('password').notEmpty().withMessage('Password is required')
	],
	async (req: Request<{}, {}, IAuthRequisites>, res: Response) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			res.status(400)
			res.json({ errors: errors.array() })
			return
		}

		const { username, password } = req.body
		const [data] = await connection.query<IUserRequisitesEntity[]>(
			'SELECT * FROM users WHERE username = ? AND password = ?',
			[username, password]
		)

		if (!data?.length) {
			res.status(404)
		}

		res.send()
	}
)
