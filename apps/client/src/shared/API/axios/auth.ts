import { httpRequest } from '../HttpRequest'

export const signinApi = (signInDao: Record<string, unknown>) =>
  httpRequest.post('/auth/login', signInDao)

export const signupApi = (signUpDao: Record<string, unknown>) =>
  httpRequest.post('/auth/register', signUpDao)
