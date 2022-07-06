/* eslint-disable @typescript-eslint/no-empty-interface */
export interface IUserResponse {
  username: string;
  email: string;
  publicAddress: string;
}

export interface IStakeResponse {
  fromAddress: string;
  toAddress: string;
  index: number;
  amount: number;
}

export interface IMarketplaceResponse {
  name: string;
  unitName: string;
  creator: string;
  index: number;
  amount: number;
  total: number;
  decimals: number;
  url: string;
  algoPrice: number;
  socksPrice: number;
  royalty: number;
}

export interface IErrorResponse {
  status: string;
  message: string;
}
