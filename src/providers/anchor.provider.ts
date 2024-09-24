import { Provider } from '@nestjs/common';
import * as anchor from '@coral-xyz/anchor';

const connection = new anchor.web3.Connection(
  'http://127.0.0.1:8899',
  'confirmed',
);
const keypair = anchor.web3.Keypair.fromSecretKey(
  anchor.web3.Keypair.generate().secretKey,
);
const wallet = new anchor.Wallet(keypair);
const providerInstance = new anchor.AnchorProvider(connection, wallet, {
  commitment: 'processed',
});

export const AnchorProvider: Provider = {
  provide: 'ANCHOR_PROVIDER',
  useValue: providerInstance,
};
