import * as anchor from '@coral-xyz/anchor';

export interface CommentAccount {
  publicKey: anchor.web3.PublicKey;
  account: {
    authority: anchor.web3.PublicKey;
    vote: number;
    url: number[];
    content: number[];
  };
}