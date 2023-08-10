import 'dotenv/config'

export const ROOT_PATH: string = process.env.ROOT_PATH
export const NODE_ENV: string = process.env.NODE_ENV

export const PORT_SERVER: number = +process.env.PORT_SERVER || 5000
export const PORT_DB: number = +process.env.PORT_DB

export const HOST_DB: string = process.env.HOST_DB
export const USER_DB: string = process.env.USER_DB
export const PASSWORD_DB: string = process.env.PASSWORD_DB
export const DATABASE: string = process.env.DATABASE
