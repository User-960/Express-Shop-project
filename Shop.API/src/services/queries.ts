import { IProductSearchFilter } from '../types/types'

export const GET_PRODUCTS_QUERY = 'SELECT * FROM products'

export const INSERT_PRODUCT_QUERY = `
        INSERT INTO products
        (product_id, title, description, price)
        VALUES
        (?, ?, ?, ?)
    `

export const GET_IMAGES_QUERY = 'SELECT * FROM images'

export const INSERT_PRODUCT_IMAGES_QUERY = `
  INSERT INTO images
  (image_id, url, product_id, main)
  VALUES ?
`

export const DELETE_IMAGES_QUERY = `
  DELETE FROM images 
  WHERE image_id IN ?;
`

export const GET_COMMENTS_QUERY = 'SELECT * FROM comments'

export const COMMENT_DUPLICATE_QUERY = `
        SELECT * FROM comments c
        WHERE LOWER(c.email) = ?
        AND LOWER(c.name) = ?
        AND LOWER(c.body) = ?
        AND c.product_id = ?
    `

export const INSERT_COMMENT_QUERY = `
        INSERT INTO comments
        (comment_id, email, name, body, product_id)
        VALUES
        (?, ?, ?, ?, ?)
   `

export const getProductsFilterQuery = (
	filter: IProductSearchFilter
): [string, string[]] => {
	const { title, description, priceFrom, priceTo } = filter

	let query = 'SELECT * FROM products WHERE '
	const values = []

	if (title) {
		query += 'title LIKE ? '
		values.push(`%${title}%`)
	}

	if (description) {
		if (values.length) {
			query += ' OR '
		}

		query += 'description LIKE ? '
		values.push(`%${description}%`)
	}

	if (priceFrom || priceTo) {
		if (values.length) {
			query += ' OR '
		}

		query += `(price > ? AND price < ?)`
		values.push(priceFrom || 0)
		values.push(priceTo || 999999)
	}

	return [query, values]
}

export const REPLACE_PRODUCT_THUMBNAIL = `
  UPDATE images
  SET main = CASE
    WHEN image_id = ? THEN 0
    WHEN image_id = ? THEN 1
    ELSE main
END
WHERE image_id IN (?, ?);
`

export const UPDATE_PRODUCT_FIELDS = `
    UPDATE products 
    SET title = ?, description = ?, price = ? 
    WHERE product_id = ?
`
