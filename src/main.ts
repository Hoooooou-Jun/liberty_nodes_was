import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { createAnchorProvider } from './utils/anchorConnection.js';
import { decodeUTF8Array } from './utils/decodeUTF8Array.js';

async function bootstrap() {
  const { provider, program } = createAnchorProvider();
  const { createHelia } = await import('helia');
  const node = await createHelia();

  console.log('PeerId:', node.libp2p.peerId.toString());
  console.log(
    'Provider Wallet PublicKey:',
    provider.wallet.publicKey.toString(),
  );

  const comments = await program.account.commentAccount.all();
  console.log(comments[0].account.authority.toString());
  console.log(decodeUTF8Array(comments[0].account.content));
  console.log(decodeUTF8Array(comments[0].account.url));
  console.log(comments[0].account.vote.toString());

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
