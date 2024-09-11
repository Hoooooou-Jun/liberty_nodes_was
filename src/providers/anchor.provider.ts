import * as anchor from '@coral-xyz/anchor';

const createAnchorProvider = (): anchor.AnchorProvider => {
  const connection = new anchor.web3.Connection(
    'http://127.0.0.1:8899',
    'confirmed',
  );
  const keypair = anchor.web3.Keypair.fromSecretKey(
    anchor.web3.Keypair.generate().secretKey,
  );
  const wallet = new anchor.Wallet(keypair);
  const provider = new anchor.AnchorProvider(connection, wallet, {
    commitment: 'processed',
  });
  return provider;
};

export default createAnchorProvider;