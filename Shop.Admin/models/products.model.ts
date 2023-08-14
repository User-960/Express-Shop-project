import { IProduct, IProductFilterPayload } from '@Shared/types/types'
import axios from 'axios'

import {
	API_PATH,
	LOCAL_PATH,
	LOCAL_PORT
} from '../../Shared/config/app-constants'

const host = `http://${LOCAL_PATH}:${LOCAL_PORT}/${API_PATH}`

export async function getProducts(): Promise<IProduct[]> {
	const { data } = await axios.get<IProduct[]>(`${host}/products`)
	return data || []
}

export async function searchProducts(
	filter: IProductFilterPayload
): Promise<IProduct[]> {
	const { data } = await axios.get<IProduct[]>(`${host}/products/search`, {
		params: filter
	})
	return data || []
}

export async function getProduct(id: string): Promise<IProduct | null> {
	try {
		const { data } = await axios.get<IProduct>(`${host}/products/${id}`)
		return data
	} catch (e) {
		return null
	}
}

export async function removeProduct(id: string): Promise<void> {
	await axios.delete(`${host}/products/${id}`)
}
