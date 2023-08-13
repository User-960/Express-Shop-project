import { RowDataPacket } from 'mysql2/index'

export interface IProduct {
	id: string
	title: string
	description: string
	price: number
	thumbnail?: IProductImage
	comments?: IComment[]
	images?: IProductImage[]
}

export interface IComment {
	id: string
	name: string
	email: string
	body: string
	productId: string
}
export interface IProductImage {
	id: string
	productId: string
	main: boolean
	url: string
}

export interface IProductFilterPayload {
	title?: string
	description?: string
	priceFrom?: number
	priceTo?: number
}
