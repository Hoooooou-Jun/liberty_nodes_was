import express from "express";
import createAnchorProvider from "./utils/anchorConnection.ts";
import { createHelia } from "helia";
import decodeUTF8Array from "./utils/decodeUTF8Array.ts";

const app = express();
const port = 3000;
const { provider, program } = createAnchorProvider();


app.get("/", (req, res) => {
    console.log(process.cwd());
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server app listening on port ${port}`);
});

(async () => {
  const node = await createHelia();
  console.log('PeerId:', node.libp2p.peerId.toString());

  console.log("Provider Wallet PublicKey:", provider.wallet.publicKey.toString());

  const comments = await program.account.commentAccount.all();
  console.log(comments[0].account.authority.toString());
  console.log(decodeUTF8Array(comments[0].account.content));
  console.log(decodeUTF8Array(comments[0].account.url));
  console.log(comments[0].account.vote.toString());
})();
