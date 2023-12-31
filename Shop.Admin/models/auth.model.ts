import { IAuthRequisites } from '@Shared/types/types'
import axios from 'axios'

import { API_HOST } from '../constants/constants'

export async function verifyRequisites(
	requisites: IAuthRequisites
): Promise<boolean> {
	try {
		const { status } = await axios.post(`${API_HOST}/auth`, requisites)

		return status === 200
	} catch (e) {
		return false
	}
}
