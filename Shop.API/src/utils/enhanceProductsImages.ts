import { IProduct, IProductImage } from '@Shared/types/types'

import { mapImageEntity } from '../services/mapping'
import { IProductImageEntity } from '../types/types'

export const enhanceProductsImages = (
	products: IProduct[],
	imageRows: IProductImageEntity[]
): IProduct[] => {
	const imagesByProductId = new Map<string, IProductImage[]>()
	const thumbnailsByProductId = new Map<string, IProductImage>()

	for (let imageEntity of imageRows) {
		const image = mapImageEntity(imageEntity)
		if (!imagesByProductId.has(image.productId)) {
			imagesByProductId.set(image.productId, [])
		}

		const list = imagesByProductId.get(image.productId)
		imagesByProductId.set(image.productId, [...list, image])

		if (image.main) {
			thumbnailsByProductId.set(image.productId, image)
		}
	}

	for (let product of products) {
		product.thumbnail = thumbnailsByProductId.get(product.id)

		if (imagesByProductId.has(product.id)) {
			product.images = imagesByProductId.get(product.id)

			if (!product.thumbnail) {
				product.thumbnail = product.images[0]
			}
		}
	}

	return products
}
