import { Injectable } from '@nestjs/common';
import createAnchorProvider from '../providers/anchor.provider.js';
import * as anchor from '@coral-xyz/anchor';
import IDL from '../configs/liberty_nodes.json' assert { type: 'json' };
import { LibertyNodes } from '../types/liberty_nodes.js';
import { CommentAccount } from '../types/index.js';
import decodeUTF8Array from '../utils/decodeUTF8Array.js';

@Injectable()
export class CommentService {
  private provider = createAnchorProvider();
  async getComment() {
    try {
      const program = new anchor.Program(IDL as LibertyNodes, this.provider);
      const commentAccountData = await program.account.commentAccount.all();
      const formattedData = commentAccountData.map((account: CommentAccount) => ({
        authority: account.account.authority.toBase58(),
        content: decodeUTF8Array(account.account.content),
        url: decodeUTF8Array(account.account.url),
        vote: account.account.vote,
      }));
      return formattedData;
    } catch (error) {
      console.error('[CommentService.getComment] Error fetching data:', error);
      throw error;
    }
  }
}
