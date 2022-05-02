export type AnchorConfig = {
  chain: string;
  network: string;
  address: string;
};

export type IConfig = {
  env: string;
  anchor: AnchorConfig;
};

export const config = (): IConfig => ({
  env: 'dev',
  anchor: {
    chain: process.env.ANCHOR_CHAIN || '',
    network: process.env.ANCHOR_NETWORK || '',
    address: process.env.ANCHOR_ADDRESS || '',
  },
});
