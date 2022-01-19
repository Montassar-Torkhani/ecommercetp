import { environment } from "src/environments/environment";

export const baseUrl = environment.production ?'https:api.shop.com': 'http://localhost:3000'

export const productsUrl = baseUrl + '/products'

export const cartUrl = baseUrl + '/cart'
