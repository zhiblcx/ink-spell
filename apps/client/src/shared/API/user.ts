import { request } from './request'

export const gerProfileAPI = () => request.get('/user/profile')
