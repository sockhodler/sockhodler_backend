/* eslint-disable @typescript-eslint/no-empty-interface */
export interface IUserResponse {
  username: string,
  email: string,
  publicAddress: string
}

export interface IErrorResponse {
  status: string,
  message: string,
}