import { IComment } from '@Shared/types/types'
import { Request, Response, Router } from 'express'
import asyncHandler from 'express-async-handler'
import { param, validationResult } from 'express-validator'
import { ResultSetHeader } from 'mysql2'
import { v4 as generateId } from 'uuid'

import { connection } from '../../..'
import { mapCommentsEntity } from '../../services/mapping'
import {
	COMMENT_DUPLICATE_QUERY,
	GET_COMMENTS_QUERY,
	INSERT_COMMENT_QUERY
} from '../../services/queries'
import { CommentCreatePayload, ICommentEntity } from '../../types/types'
import { throwServerError } from '../../utils/error/throwServerError'
import { validateComment } from '../../utils/validateComment'

export const commentsRouter = Router()

// @desc    Get all comments
// @route   GET /api/comments
// @access  Public
commentsRouter.route('/').get(
	asyncHandler(async (req: Request, res: Response) => {
		try {
			const [comments] = await connection.query<ICommentEntity[]>(
				GET_COMMENTS_QUERY
			)

			res.setHeader('Content-Type', 'application/json')
			res.send(mapCommentsEntity(comments))
		} catch (e) {
			throwServerError(res, e)
		}
	})
)

// @desc    Get one comment by id
// @route   GET /api/comments/:id
// @access  Public
commentsRouter.get(
	'/:id',
	[param('id').isUUID().withMessage('Comment id is not UUID')],
	async (req: Request<{ id: string }>, res: Response) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				res.status(400)
				res.json({ errors: errors.array() })
				return
			}

			const [rows] = await connection.query<ICommentEntity[]>(
				'SELECT * FROM comments WHERE comment_id = ?',
				[req.params.id]
			)

			if (!rows?.[0]) {
				res.status(404)
				res.send(`Comment with id ${req.params.id} is not found`)
				return
			}

			res.setHeader('Content-Type', 'application/json')
			res.send(mapCommentsEntity(rows)[0])
		} catch (e) {
			console.debug(e.message)
			res.status(500)
			res.send('Something went wrong')
		}
	}
)

// @desc    Create new comment
// @route   POST /api/comments
// @access  Public
commentsRouter.route('/').post(
	asyncHandler(
		async (req: Request<{}, {}, CommentCreatePayload>, res: Response) => {
			const validationResult = validateComment(req.body)

			if (validationResult) {
				res.status(400)
				res.send(validationResult)
				return
			}

			try {
				const { name, email, body, productId } = req.body

				const [sameResult] = await connection.query<ICommentEntity[]>(
					COMMENT_DUPLICATE_QUERY,
					[
						email.toLowerCase(),
						name.toLowerCase(),
						body.toLowerCase(),
						productId
					]
				)

				if (sameResult.length) {
					res.status(422)
					res.send('Comment with the same fields already exists')
					return
				}

				const id = generateId()
				await connection.query<ResultSetHeader>(INSERT_COMMENT_QUERY, [
					id,
					email,
					name,
					body,
					productId
				])

				res.status(201)
				res.send(`Comment id:${id} has been added!`)
			} catch (e) {
				console.debug(e.message)
				res.status(500)
				res.send('Server error. Comment has not been created')
			}
		}
	)
)

// @desc    Update comments
// @route   PATCH /api/comments
// @access  Public
commentsRouter.route('/').patch(
	asyncHandler(
		async (req: Request<{}, {}, Partial<IComment>>, res: Response) => {
			try {
				let updateQuery = 'UPDATE comments SET '

				const valuesToUpdate = []
				;['name', 'body', 'email'].forEach(fieldName => {
					if (req.body.hasOwnProperty(fieldName)) {
						if (valuesToUpdate.length) {
							updateQuery += ', '
						}

						updateQuery += `${fieldName} = ?`
						valuesToUpdate.push(req.body[fieldName])
					}
				})

				updateQuery += ' WHERE comment_id = ?'
				valuesToUpdate.push(req.body.id)

				const [info] = await connection.query<ResultSetHeader>(
					updateQuery,
					valuesToUpdate
				)

				if (info.affectedRows === 1) {
					res.status(200)
					res.end()
					return
				}

				const newComment = req.body as CommentCreatePayload
				const validationResult = validateComment(newComment)

				if (validationResult) {
					res.status(400)
					res.send(validationResult)
					return
				}

				const id = generateId()
				await connection.query<ResultSetHeader>(INSERT_COMMENT_QUERY, [
					id,
					newComment.email,
					newComment.name,
					newComment.body,
					newComment.productId
				])

				res.status(201)
				res.send({ ...newComment, id })
			} catch (e) {
				console.log(e.message)
				res.status(500)
				res.send('Server error')
			}
		}
	)
)

// @desc    Delete comments
// @route   DELETE /api/comments/:id
// @access  Public
commentsRouter.route('/:id').delete(
	asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
		try {
			const [info] = await connection.query<ResultSetHeader>(
				'DELETE FROM comments WHERE comment_id = ?',
				[req.params.id]
			)

			if (info.affectedRows === 0) {
				res.status(404)
				res.send(`Comment with id ${req.params.id} is not found`)
				return
			}

			res.status(200)
			res.end()
		} catch (e) {
			console.log(e.message)
			res.status(500)
			res.send('Server error. Comment has not been deleted')
		}
	})
)
