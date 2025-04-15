import * as anchor from '@coral-xyz/anchor';

export interface CommentAccount {
  publicKey: anchor.web3.PublicKey;
  account: {
    authority: anchor.web3.PublicKey;
    vote: anchor.BN;
    url: anchor.BN;
    cid: string;
  };
}

export interface JwtPayload {
  sub: string;
  email: string;
}