import { Inject, Injectable } from '@nestjs/common';
import * as anchor from '@coral-xyz/anchor';
import IDL from '../configs/liberty_nodes.json' assert { type: 'json' };
import { LibertyNodes } from '../types/liberty_nodes.js';
import { CommentAccount } from '../types/index.js';
import { Client } from '@web3-storage/w3up-client';
import { BN } from "bn.js";
import { PublicKey } from '@solana/web3.js';

@Injectable()
export class CommentService {
  private program: anchor.Program<LibertyNodes>;

  constructor(
    @Inject('ANCHOR_PROVIDER') private readonly anchorProvider: anchor.AnchorProvider,
    @Inject('IPFS_PROVIDER') private readonly IPFSProvider: Client,
  ) {
    this.program = new anchor.Program(IDL as LibertyNodes, this.anchorProvider);
  }
  async getComment() {
    try {
      const commentAccountData = await this.program.account.commentAccount.all();
      const formattedData = commentAccountData.map((account: CommentAccount) => ({
        authority: account.account.authority.toBase58(),
        url: account.account.url.toString(),
        cid: account.account.cid,
        vote: account.account.vote.toString(),
      }));
      return formattedData;
    } catch (error) {
      console.error('[CommentService.getComment] Error fetching data:', error);
      throw error;
    }
  }
  async createComment(publicKey: string, secretKey: string, url: string, content: string) {
    try {
      const metadata = {
        authority: publicKey,
        url: 1,
        content: content,
        timestamp: new Date().toISOString(),
      }
      const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' })
      const file = new File([blob], 'metadata.json')
      const cid = await this.IPFSProvider.uploadFile(file);

    } catch (error) {
      console.error('[CommentService.createComment] Error creating comment:', error);
      throw error;
    }
  }
}
