import axios from 'axios'

import {
	API_PATH,
	LOCAL_HOST,
	PORT_SERVER
} from '../../Shared/config/app.constants'
import { IProduct } from '../../Shared/types/types'

const host = `http://${LOCAL_HOST}:${PORT_SERVER}/${API_PATH}`

export async function getProducts() {
	const { data } = await axios.get<IProduct[]>(`${host}/products`)
	console.log(data.length)
}
